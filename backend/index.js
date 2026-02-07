require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY)
const admin = require('firebase-admin')
const port = process.env.PORT || 3000
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString(
  'utf-8'
)
const serviceAccount = JSON.parse(decoded)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const app = express()
// middleware
app.use(
  cors({
    origin: [process.env.CLIENT_DOMAIN],
    credentials: true,
    optionSuccessStatus: 200,
  })
)
app.use(express.json())

// jwt middlewares
const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1]
  console.log(token)
  if (!token) return res.status(401).send({ message: 'Unauthorized Access!' })
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.tokenEmail = decoded.email
    console.log(decoded)
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).send({ message: 'Unauthorized Access!', err })
  }
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {
  try {
    const db = client.db('mobileDB')
    const mobileCollection = db.collection('mobile')
    const ordersCollection = db.collection('orders')
    const usersCollection = db.collection('users')
    const contextRequestCollection = db.collection('contextRequest')

    // role middlewares
    const verifyADMIN = async (req, res, next) => {
      const email = req.tokenEmail
      const user = await usersCollection.findOne({ email })
      if (user?.role !== 'admin')
        return res
          .status(403)
          .send({ message: 'Admin only Actions!', role: user?.role })

      next()
    }
    const verifySELLER = async (req, res, next) => {
      const email = req.tokenEmail
      const user = await usersCollection.findOne({ email })
      if (user?.role !== 'seller')
        return res
          .status(403)
          .send({ message: 'Seller only Actions!', role: user?.role })

      next()
    }

    // Save a mobile data in db
  app.post("/mobiles", async (req, res) => {
  const mobileData = req.body;
   console.log(mobileData);
  const result = await mobileCollection.insertOne(mobileData);
  res.send(result);
});


    // get all mobile from db
    app.get('/mobiles', async (req, res) => {
      const cursor = mobileCollection.find().limit(8)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/allContext', async (req, res) => {
      const cursor = mobileCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    




app.delete('/mobiles/:id', verifyJWT, verifySELLER, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await mobileCollection.deleteOne(query);
  res.send(result);
});

app.delete('/orders/:id', verifyJWT, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await ordersCollection.deleteOne(query);
  res.send(result);
});

    // get all mobile from db
    app.get('/mobiles/:id', async (req, res) => {
      const id = req.params.id
      const result = await mobileCollection.findOne({ _id: new ObjectId(id) })
      res.send(result)
    })

    // Payment endpoints
    app.post('/create-checkout-session', async (req, res) => {
      const paymentInfo = req.body
      console.log(paymentInfo)
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: paymentInfo?.name,
                description: paymentInfo?.description,
                images: [paymentInfo.image],
              },
              unit_amount: paymentInfo?.price * 100,
            },
            quantity: paymentInfo?.quantity,
          },
        ],
        customer_email: paymentInfo?.customer?.email,
        mode: 'payment',
        metadata: {
          mobileId: paymentInfo?.mobileId,
          customer: paymentInfo?.customer.email,
        },
        success_url: `${process.env.CLIENT_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/mobile/${paymentInfo?.mobileId}`,
      })
      res.send({ url: session.url })
    })

    app.post('/payment-success', async (req, res) => {
      const { sessionId } = req.body
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      const mobile = await mobileCollection.findOne({
        _id: new ObjectId(session.metadata.mobileId),
      })
      const order = await ordersCollection.findOne({
        transactionId: session.payment_intent,
      })

      if (session.status === 'complete' && mobile && !order) {
        // save order data in db
        const orderInfo = {
          mobileId: session.metadata.mobileId,
          transactionId: session.payment_intent,
          customer: session.metadata.customer,
          status: 'pending',
          seller: mobile.seller,
          name: mobile.name,
          category: mobile.category,
          quantity: 1,
          price: session.amount_total / 100,
          image: mobile?.image,
        }
        const result = await ordersCollection.insertOne(orderInfo)
        // update mobile quantity
        await mobileCollection.updateOne(
          {
            _id: new ObjectId(session.metadata.mobileId),
          },
          { $inc: { quantity: -1 } }
        )

        return res.send({
          transactionId: session.payment_intent,
          orderId: result.insertedId,
        })
      }
      res.send(
        res.send({
          transactionId: session.payment_intent,
          orderId: order._id,
        })
      )
    })

    // get all orders for a customer by email
    app.get('/my-orders', verifyJWT, async (req, res) => {
      const result = await ordersCollection
        .find({ customer: req.tokenEmail })
        .toArray()
      res.send(result)
    })

    // get all orders for a seller by email
    app.get(
      '/manage-orders/:email',
      verifyJWT,
      verifySELLER,
      async (req, res) => {
        const email = req.params.email

        const result = await ordersCollection
          .find({ 'seller.email': email })
          .toArray()
        res.send(result)
      }
    )

    // get all mobile for a seller by email
    app.get(
      '/my-inventory/:email',
      verifyJWT,
      verifySELLER,
      async (req, res) => {
        const email = req.params.email

        const result = await mobileCollection
          .find({ 'seller.email': email })
          .toArray()
        res.send(result)
      }
    )

    // save or update a user in db
    app.post('/user', async (req, res) => {
      const userData = req.body
      userData.created_at = new Date().toISOString()
      userData.last_loggedIn = new Date().toISOString()
      userData.role = 'customer'

      const query = {
        email: userData.email,
      }

      const alreadyExists = await usersCollection.findOne(query)
      console.log('User Already Exists---> ', !!alreadyExists)

      if (alreadyExists) {
        console.log('Updating user info......')
        const result = await usersCollection.updateOne(query, {
          $set: {
            last_loggedIn: new Date().toISOString(),
          },
        })
        return res.send(result)
      }

      console.log('Saving new user info......')
      const result = await usersCollection.insertOne(userData)
      res.send(result)
    })

    // get a user's role
    app.get('/user/role', verifyJWT, async (req, res) => {
      const result = await usersCollection.findOne({ email: req.tokenEmail })
      res.send({ role: result?.role })
    })

    // save become-seller request
    app.post('/become-seller', verifyJWT, async (req, res) => {
      const email = req.tokenEmail
      const alreadyExists = await sellerRequestsCollection.findOne({ email })
      if (alreadyExists)
        return res
          .status(409)
          .send({ message: 'Already requested, wait koro.' })

      const result = await sellerRequestsCollection.insertOne({ email })
      res.send(result)
    })

    // get all seller requests for admin
    app.get('/seller-requests', verifyJWT, verifyADMIN, async (req, res) => {
      const result = await sellerRequestsCollection.find().toArray()
      res.send(result)
    })

    // get all users for admin
    app.get('/users', verifyJWT, verifyADMIN, async (req, res) => {
      const adminEmail = req.tokenEmail
      const result = await usersCollection
        .find({ email: { $ne: adminEmail } })
        .toArray()
      res.send(result)
    })

    // update a user's role
    app.patch('/update-role', verifyJWT, verifyADMIN, async (req, res) => {
      const { email, role } = req.body
      const result = await usersCollection.updateOne(
        { email },
        { $set: { role } }
      )
      await sellerRequestsCollection.deleteOne({ email })

      res.send(result)
    })
    // DELETE route for mobiles
app.delete('/mobiles/:id', verifyJWT, verifySELLER, async (req, res) => {
  const id = req.params.id
  const result = await mobileCollection.deleteOne({ _id: new ObjectId(id) })
  res.send(result)
})
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from Server..')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})


/////222222



// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
// const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY)
// const admin = require('firebase-admin')
// const port = process.env.PORT || 3000

// // Firebase Admin Setup
// const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf-8')
// const serviceAccount = JSON.parse(decoded)
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

// const app = express()

// // Middleware
// app.use(
//   cors({
//     origin: [process.env.CLIENT_DOMAIN],
//     credentials: true,
//     optionSuccessStatus: 200,
//   })
// )
// app.use(express.json())

// // JWT Middleware
// const verifyJWT = async (req, res, next) => {
//   const token = req?.headers?.authorization?.split(' ')[1]
//   if (!token) return res.status(401).send({ message: 'Unauthorized Access!' })
//   try {
//     const decoded = await admin.auth().verifyIdToken(token)
//     req.tokenEmail = decoded.email
//     next()
//   } catch (err) {
//     return res.status(401).send({ message: 'Unauthorized Access!', err })
//   }
// }

// // MongoDB Connection
// const client = new MongoClient(process.env.MONGODB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// })

// async function run() {
//   try {
//     const db = client.db('mobileDB')
//     const mobileCollection = db.collection('mobile')
//     const ordersCollection = db.collection('orders')
//     const usersCollection = db.collection('users')
//     // ✅ 1. Collection Initialize kora holo
//     const sellerRequestsCollection = db.collection('sellerRequests')

//     // Role Middlewares
//     const verifyADMIN = async (req, res, next) => {
//       const email = req.tokenEmail
//       const user = await usersCollection.findOne({ email })
//       if (user?.role !== 'admin')
//         return res.status(403).send({ message: 'Admin only Actions!' })
//       next()
//     }

//     const verifySELLER = async (req, res, next) => {
//       const email = req.tokenEmail
//       const user = await usersCollection.findOne({ email })
//       if (user?.role !== 'seller')
//         return res.status(403).send({ message: 'Seller only Actions!' })
//       next()
//     }

//     // --- API ROUTES ---

//     // 2. Become Seller Route (PATCH)
//     app.patch('/become-seller', verifyJWT, async (req, res) => {
//       const email = req.tokenEmail
      
//       // Check if already a seller
//       const user = await usersCollection.findOne({ email })
//       if (user?.role === 'seller') return res.status(400).send('Already a Seller')

//       // Check if already requested
//       const alreadyExists = await sellerRequestsCollection.findOne({ email })
//       if (alreadyExists) return res.status(409).send('Wait for Admin Approval')

//       const result = await sellerRequestsCollection.insertOne({ 
//         email, 
//         status: 'Pending',
//         requestDate: new Date() 
//       })
//       res.send(result)
//     })

//     // 3. Get all seller requests (Admin Only)
//     app.get('/seller-requests', verifyJWT, verifyADMIN, async (req, res) => {
//       const result = await sellerRequestsCollection.find().toArray()
//       res.send(result)
//     })

//     // 4. Update User Role & Delete Request (Admin Only)
//     app.patch('/update-role', verifyJWT, verifyADMIN, async (req, res) => {
//       const { email, role } = req.body
//       const result = await usersCollection.updateOne(
//         { email },
//         { $set: { role } }
//       )
//       // Request accept hole list theke delete kore dewa
//       await sellerRequestsCollection.deleteOne({ email })
//       res.send(result)
//     })

//     // Mobiles Related
//     app.post("/mobiles", verifyJWT, verifySELLER, async (req, res) => {
//       const result = await mobileCollection.insertOne(req.body)
//       res.send(result)
//     })

//     app.get('/mobiles', async (req, res) => {
//       const result = await mobileCollection.find().toArray()
//       res.send(result)
//     })

//     app.get('/mobiles/:id', async (req, res) => {
//       const result = await mobileCollection.findOne({ _id: new ObjectId(req.params.id) })
//       res.send(result)
//     })

//     // Orders Related
//     app.get('/my-orders', verifyJWT, async (req, res) => {
//       const result = await ordersCollection.find({ customer: req.tokenEmail }).toArray()
//       res.send(result)
//     })

//     // User Related
//     app.post('/user', async (req, res) => {
//       const userData = req.body
//       const query = { email: userData.email }
//       const alreadyExists = await usersCollection.findOne(query)

//       if (alreadyExists) {
//         const result = await usersCollection.updateOne(query, {
//           $set: { last_loggedIn: new Date().toISOString() },
//         })
//         return res.send(result)
//       }

//       userData.created_at = new Date().toISOString()
//       userData.role = 'customer'
//       const result = await usersCollection.insertOne(userData)
//       res.send(result)
//     })

//     app.get('/user/role', verifyJWT, async (req, res) => {
//       const result = await usersCollection.findOne({ email: req.tokenEmail })
//       res.send({ role: result?.role })
//     })

//     // --- PAYMENT (Stripe) ---
//     app.post('/create-checkout-session', verifyJWT, async (req, res) => {
//       const paymentInfo = req.body
//       const session = await stripe.checkout.sessions.create({
//         line_items: [{
//           price_data: {
//             currency: 'usd',
//             product_data: { name: paymentInfo?.name, images: [paymentInfo.image] },
//             unit_amount: paymentInfo?.price * 100,
//           },
//           quantity: paymentInfo?.quantity,
//         }],
//         customer_email: paymentInfo?.customer?.email,
//         mode: 'payment',
//         metadata: { mobileId: paymentInfo?.mobileId, customer: paymentInfo?.customer.email },
//         success_url: `${process.env.CLIENT_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${process.env.CLIENT_DOMAIN}/mobiles/${paymentInfo?.mobileId}`,
//       })
//       res.send({ url: session.url })
//     })

//     // MongoDB Ping
//     await client.db('admin').command({ ping: 1 })
//     console.log('Successfully connected to MongoDB!')
//   } finally { }
// }
// run().catch(console.dir)

// app.get('/', (req, res) => res.send('Server is running..'))
// app.listen(port, () => console.log(`Port: ${port}`))




// /// 3

