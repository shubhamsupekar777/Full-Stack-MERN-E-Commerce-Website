// import React, { useContext, useState } from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import { assets } from '../assets/assets'
// import { ShopContext } from '../context/ShopContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const PlaceOrder = () => {
//   const [method,setMethod] =useState('cod');
//   const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext);
//   const [formData,setFormData]=useState({
//     firstName:'',
//     lastName:'',
//     email:'',
//     street:'',
//     city:'',
//     state:'',
//     zipcode:'',
//     country:'',
//     phone:'',
//   });

//   const onChangeHandler=(event)=>{
//     const name=event.target.name;
//     const value=event.target.value;
//     setFormData(data=>({...data,[name]:value}));
//   }


//   const onSubmitHandler=async(event)=>{   //  fixed name and added event parameter
//     event.preventDefault();               // prevent page reload
//     try {
//       let orderItems=[]
//       for(const items in cartItems){
//         for(const item in cartItems[items]){
//           if (cartItems[items][item]>0) {
//             const itemInfo=structuredClone(products.find(product=>product._id===items))
//             if (itemInfo) {
//               itemInfo.size=item
//               itemInfo.quantity=cartItems[items][item]
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }
    
//       let orderData={
//         address:formData,
//         items:orderItems,
//         amount:getCartAmount() + delivery_fee
//       }

//       switch(method){
//         //API Calls for cod
//         case 'cod':
//           const response = await axios.post(
//   backendUrl + '/api/order/place',
//   orderData,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// );

         
//           if(response.data.success){
//             setCartItems({});
//             navigate('/orders')
//           }else{
//             toast.error(response.data.message);
//           }
//         break;
//         case 'stripe':
//           const responseStripe=await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
//           if (responseStripe.data.success) {
//             const {session_url}=responseStripe.data
//             window.location.replace(session_url)
            
//           }else{
//             toast.error(responseStripe.data.message)
//           }
          
//           break;
//           // case 'razorpay':
//           //   const responseRazorpay=await axios.post(backendUrl+'/api/order/razorpay',orderData,{headers:{token}})
//           //   if(responseRazorpay.data.success){
//           //     initPay(responseRazorpay.data.order);
//           //   }

//         default:
//       }

//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row  justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'> {/* ✅ changed to onSubmitHandler */}
//       {/* Left side */}
//       <div  className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
//         </div>
//         <div className='flex gap-3'>
//           <input  required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name'  />
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name'  />
//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address'  />
//         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'  />
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'  />
//           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'  />
//         </div>
//         <div className='flex gap-3'>
//           <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Pin Code'  />
//           <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'  />
//         </div>
//         <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone Number'  />
//       </div>

//       {/* ------------------Right Side---------------- */}
//       <div className='mt-8 min-w-80'>
//         <CartTotal/>
//       </div> 
//       <div className='mt-12'>
//         <Title text1={'PAYMENT'} text2={'METHOD'}/>
//         {/* Payment Method  */}
//         <div  className='flex gap-3 flex-col lg:flex-row'>
//           <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' ? 'bg-green-400':''}`}></p>
//             <img className='h-5 mx-4 ' src={assets.stripe_logo} alt=''/>
//           </div>
//           <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay' ? 'bg-green-400':''}`}></p>
//             <img className='h-5 mx-4 ' src={assets.razorpay_logo} alt=''/>
//           </div>
//           <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' ?'bg-green-400':''}`}></p>
//             <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//           </div>
//         </div>

//         <div className='w-full text-end mt-8'>
//           <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder  


import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  // ---------------- VALIDATION FUNCTION ----------------
  const validateForm = () => {
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = formData;

    if (!firstName.trim() || firstName.length < 2) {
      toast.error("First name must be at least 2 characters")
      return false
    }

    if (!lastName.trim() || lastName.length < 2) {
      toast.error("Last name must be at least 2 characters")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address")
      return false
    }

    if (!street.trim()) {
      toast.error("Street is required")
      return false
    }

    if (!city.trim()) {
      toast.error("City is required")
      return false
    }

    if (!state.trim()) {
      toast.error("State is required")
      return false
    }

    if (!country.trim()) {
      toast.error("Country is required")
      return false
    }

    const pinRegex = /^[0-9]{6}$/
    if (!pinRegex.test(zipcode)) {
      toast.error("Pin code must be 6 digits")
      return false
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits")
      return false
    }

    return true
  }

  // ---------------- INPUT HANDLER ----------------
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  // ---------------- SUBMIT HANDLER ----------------
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        // -------- COD --------
        case 'cod':
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break

        // -------- STRIPE --------
        case 'stripe':
          const responseStripe = await axios.post(
            backendUrl + '/api/order/stripe',
            orderData,
            { headers: { token } }
          )

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break

        default:
          break
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>

      {/* ---------------- LEFT SIDE ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
            pattern="[A-Za-z]{2,}"
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='First Name'
          />

          <input
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
            pattern="[A-Za-z]{2,}"
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Last Name'
          />
        </div>

        <input
          type="email"
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          required
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Email Address'
        />

        <input
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
          required
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="text"
          placeholder='Street'
        />

        <div className='flex gap-3'>
          <input
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='City'
          />

          <input
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='State'
          />
        </div>

        <div className='flex gap-3'>
          <input
            name='zipcode'
            value={formData.zipcode}
            onChange={onChangeHandler}
            maxLength={6}
            pattern="[0-9]{6}"
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Pin Code'
          />

          <input
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Country'
          />
        </div>

        <input
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
          maxLength={10}
          pattern="[0-9]{10}"
          required
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="tel"
          placeholder='Phone Number'
        />

      </div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <div className='mt-8 min-w-80'>
        <CartTotal />
      </div>

      <div className='mt-12'>
        <Title text1={'PAYMENT'} text2={'METHOD'} />

        <div className='flex gap-3 flex-col lg:flex-row'>

          <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />
          </div>

          <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt='' />
          </div>

          <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
          </div>

        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
            PLACE ORDER
          </button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder