// 'use client'
// import { Fragment, useState } from "react";
// import {
//   Dialog,
//   Popover,
//   RadioGroup,
//   Tab,
//   Transition,
// } from "@headlessui/react";
// import {
//   MenuIcon,
//   QuestionMarkCircleIcon,
//   SearchIcon,
//   ShoppingBagIcon,
//   XIcon,
// } from "@heroicons/react/outline";
// import { CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
// import Footer from "../../Components/Footer";
// import { countries } from "countries-list";
// const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
// const navigation = {
//   categories: [
//     {
//       name: "Women",
//       featured: [
//         {
//           name: "New Arrivals",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
//           imageAlt:
//             "Models sitting back to back, wearing Basic Tee in black and bone.",
//         },
//         {
//           name: "Basic Tees",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
//           imageAlt:
//             "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
//         },
//         {
//           name: "Accessories",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
//           imageAlt:
//             "Model wearing minimalist watch with black wristband and white watch face.",
//         },
//         {
//           name: "Carry",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",
//           imageAlt:
//             "Model opening tan leather long wallet with credit card pockets and cash pouch.",
//         },
//       ],
//     },
//     {
//       name: "Men",
//       featured: [
//         {
//           name: "New Arrivals",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
//           imageAlt:
//             "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
//         },
//         {
//           name: "Basic Tees",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
//           imageAlt: "Model wearing light heather gray t-shirt.",
//         },
//         {
//           name: "Accessories",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
//           imageAlt:
//             "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
//         },
//         {
//           name: "Carry",
//           href: "#",
//           imageSrc:
//             "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
//           imageAlt:
//             "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
//         },
//       ],
//     },
//   ],
//   pages: [
//     { name: "Company", href: "#" },
//     { name: "Stores", href: "#" },
//   ],
// };
// const products = [
//   {
//     id: 1,
//     title: "Basic Tee",
//     href: "#",
//     price: "$32.00",
//     color: "Black",
//     size: "Large",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//   },
//   // More products...
// ];
// const deliveryMethods = [
//   {
//     id: 1,
//     title: "Standard",
//     turnaround: "4–10 business days",
//     price: "$5.00",
//   },
//   { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
// ];
// const paymentMethods = [
//   { id: "credit-card", title: "Credit card" },
//   { id: "paypal", title: "PayPal" },
//   { id: "etransfer", title: "eTransfer" },
// ];
// const footerNavigation = {
//   products: [
//     { name: "Bags", href: "#" },
//     { name: "Tees", href: "#" },
//     { name: "Objects", href: "#" },
//     { name: "Home Goods", href: "#" },
//     { name: "Accessories", href: "#" },
//   ],
//   company: [
//     { name: "Who we are", href: "#" },
//     { name: "Sustainability", href: "#" },
//     { name: "Press", href: "#" },
//     { name: "Careers", href: "#" },
//     { name: "Terms & Conditions", href: "#" },
//     { name: "Privacy", href: "#" },
//   ],
//   customerService: [
//     { name: "Contact", href: "#" },
//     { name: "Shipping", href: "#" },
//     { name: "Returns", href: "#" },
//     { name: "Warranty", href: "#" },
//     { name: "Secure Payments", href: "#" },
//     { name: "FAQ", href: "#" },
//     { name: "Find a store", href: "#" },
//   ],
// };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const CheckoutPage = ({ cartItems, setCartItems }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0);
//   };
//   const calculateTax = () => {
//     const subtotal = calculateTotal();
//     const taxRate = 0.013;
//     const taxAmount = subtotal * taxRate;
//     return taxAmount.toFixed(1);
//   };
//   const calculateOrderTotal = () => {
//     const subtotal = calculateTotal();
//     const shippingPrice = selectedDeliveryMethod
//       ? parseFloat(selectedDeliveryMethod.price.replace("$", ""))
//       : 0;
//     return (subtotal + shippingPrice).toFixed(2);
//   };
//   const handleRemoveItem = (index, event) => {
//     // Prevent the default form submission behavior
//     event.preventDefault();

//     // Create a copy of the cart items array
//     const updatedCart = [...cartItems];
//     // Remove the item at the specified index
//     updatedCart.splice(index, 1);
//     // Update the cart items state with the new array
//     setCartItems(updatedCart);
//   };

//   const countryNames = Object.values(countries).map((country) => country.name);
//   return (
//     <div className="bg-gray-50">
//       {/* Mobile menu */}
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 flex z-40 lg:hidden"
//           onClose={setOpen}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <Transition.Child
//             as={Fragment}
//             enter="transition ease-in-out duration-300 transform"
//             enterFrom="-translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition ease-in-out duration-300 transform"
//             leaveFrom="translate-x-0"
//             leaveTo="-translate-x-full"
//           >
//             <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
//               <div className="px-4 pt-5 pb-2 flex">
//                 <button
//                   type="button"
//                   className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>

//               {/* Links */}
//               <Tab.Group as="div" className="mt-2">
//                 <div className="border-b border-gray-200">
//                   <Tab.List className="-mb-px flex px-4 space-x-8">
//                     {navigation.categories.map((category) => (
//                       <Tab
//                         key={category.name}
//                         className={({ selected }) =>
//                           classNames(
//                             selected
//                               ? "text-indigo-600 border-indigo-600"
//                               : "text-gray-900 border-transparent",
//                             "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
//                           )
//                         }
//                       >
//                         {category.name}
//                       </Tab>
//                     ))}
//                   </Tab.List>
//                 </div>
//                 <Tab.Panels as={Fragment}>
//                   {navigation.categories.map((category) => (
//                     <Tab.Panel
//                       key={category.name}
//                       className="px-4 py-6 space-y-12"
//                     >
//                       <div className="grid grid-cols-2 gap-x-4 gap-y-10">
//                         {category.featured.map((item) => (
//                           <div key={item.name} className="group relative">
//                             <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
//                               <img
//                                 src={item.imageSrc}
//                                 alt={item.imageAlt}
//                                 className="object-center object-cover"
//                               />
//                             </div>
//                             <a
//                               href={item.href}
//                               className="mt-6 block text-sm font-medium text-gray-900"
//                             >
//                               <span
//                                 className="absolute z-10 inset-0"
//                                 aria-hidden="true"
//                               />
//                               {item.name}
//                             </a>
//                             <p
//                               aria-hidden="true"
//                               className="mt-1 text-sm text-gray-500"
//                             >
//                               Shop now
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </Tab.Panel>
//                   ))}
//                 </Tab.Panels>
//               </Tab.Group>

//               <div className="border-t border-gray-200 py-6 px-4 space-y-6">
//                 {navigation.pages.map((page) => (
//                   <div key={page.name} className="flow-root">
//                     <a
//                       href={page.href}
//                       className="-m-2 p-2 block font-medium text-gray-900"
//                     >
//                       {page.name}
//                     </a>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-gray-200 py-6 px-4 space-y-6">
//                 <div className="flow-root">
//                   <a
//                     href="#"
//                     className="-m-2 p-2 block font-medium text-gray-900"
//                   >
//                     Create an account
//                   </a>
//                 </div>
//                 <div className="flow-root">
//                   <a
//                     href="#"
//                     className="-m-2 p-2 block font-medium text-gray-900"
//                   >
//                     Sign in
//                   </a>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 py-6 px-4 space-y-6">
//                 {/* Currency selector */}
//                 <form>
//                   <div className="inline-block">
//                     <label htmlFor="mobile-currency" className="sr-only">
//                       Currency
//                     </label>
//                     <div className="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
//                       <select
//                         id="mobile-currency"
//                         name="currency"
//                         className="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
//                       >
//                         {currencies.map((currency) => (
//                           <option key={currency}>{currency}</option>
//                         ))}
//                       </select>
//                       <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
//                         <svg
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 20 20"
//                           className="w-5 h-5 text-gray-500"
//                         >
//                           <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="1.5"
//                             d="M6 8l4 4 4-4"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </Transition.Child>
//         </Dialog>
//       </Transition.Root>

//       <header className="relative">
//         <nav aria-label="Top">
//           <div className="bg-gray-900">
//             <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
//               <form>
//                 <div>
//                   <label htmlFor="desktop-currency" className="sr-only">
//                     Currency
//                   </label>
//                   <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
//                     <select
//                       id="desktop-currency"
//                       name="currency"
//                       className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
//                     >
//                       {currencies.map((currency) => (
//                         <option key={currency}>{currency}</option>
//                       ))}
//                     </select>
//                     <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
//                       <svg
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 20"
//                         className="w-5 h-5 text-gray-300"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1.5"
//                           d="M6 8l4 4 4-4"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </form>

//               <div className="flex items-center space-x-6">
//                 <a
//                   href="#"
//                   className="text-sm font-medium text-white hover:text-gray-100"
//                 >
//                   Sign in
//                 </a>
//                 <a
//                   href="#"
//                   className="text-sm font-medium text-white hover:text-gray-100"
//                 >
//                   Create an account
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-2xl mx-auto lg:max-w-none">
//           <h1 className="sr-only">Checkout</h1>

//           <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
//             <div>
//               <div>
//                 <h2 className="text-lg font-medium text-gray-900">
//                   Contact information
//                 </h2>

//                 <div className="mt-4">
//                   <label
//                     htmlFor="email-address"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email address
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="email"
//                       id="email-address"
//                       name="email-address"
//                       autoComplete="email"
//                       className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-10 border-t border-gray-200 pt-10">
//                 <h2 className="text-lg font-medium text-gray-900">
//                   Shipping information
//                 </h2>

//                 <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                   <div>
//                     <label
//                       htmlFor="first-name"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       First name
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         id="first-name"
//                         name="first-name"
//                         autoComplete="given-name"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="last-name"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Last name
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         id="last-name"
//                         name="last-name"
//                         autoComplete="family-name"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="company"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Company
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="company"
//                         id="company"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Address
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="address"
//                         id="address"
//                         autoComplete="street-address"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="apartment"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Apartment, suite, etc.
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="apartment"
//                         id="apartment"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="city"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       City
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="city"
//                         id="city"
//                         autoComplete="address-level2"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="country"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Country
//                     </label>
//                     <div className="mt-1">
//                       <select
//                         id="country"
//                         name="country"
//                         autoComplete="country-name"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       >
//                         {countryNames.map((countryName, index) => (
//                           <option key={index}>{countryName}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="region"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       State / Province
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="region"
//                         id="region"
//                         autoComplete="address-level1"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="postal-code"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Postal code
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="postal-code"
//                         id="postal-code"
//                         autoComplete="postal-code"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Phone
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         type="text"
//                         name="phone"
//                         id="phone"
//                         autoComplete="tel"
//                         className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-10 border-t border-gray-200 pt-10">
//                 <RadioGroup
//                   value={selectedDeliveryMethod}
//                   onChange={setSelectedDeliveryMethod}
//                 >
//                   <RadioGroup.Label className="text-lg font-medium text-gray-900">
//                     Delivery method
//                   </RadioGroup.Label>

//                   <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                     {deliveryMethods.map((deliveryMethod) => (
//                       <RadioGroup.Option
//                         key={deliveryMethod.id}
//                         value={deliveryMethod}
//                         className={({ checked, active }) =>
//                           classNames(
//                             checked ? "border-transparent" : "border-gray-300",
//                             active ? "ring-2 ring-indigo-500" : "",
//                             "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
//                           )
//                         }
//                       >
//                         {({ checked, active }) => (
//                           <>
//                             <div className="flex-1 flex">
//                               <div className="flex flex-col">
//                                 <RadioGroup.Label
//                                   as="span"
//                                   className="block text-sm font-medium text-gray-900"
//                                 >
//                                   {deliveryMethod.title}
//                                 </RadioGroup.Label>
//                                 <RadioGroup.Description
//                                   as="span"
//                                   className="mt-1 flex items-center text-sm text-gray-500"
//                                 >
//                                   {deliveryMethod.turnaround}
//                                 </RadioGroup.Description>
//                                 <RadioGroup.Description
//                                   as="span"
//                                   className="mt-6 text-sm font-medium text-gray-900"
//                                 >
//                                   {deliveryMethod.price}
//                                 </RadioGroup.Description>
//                               </div>
//                             </div>
//                             {checked ? (
//                               <CheckCircleIcon
//                                 className="h-5 w-5 text-indigo-600"
//                                 aria-hidden="true"
//                               />
//                             ) : null}
//                             <div
//                               className={classNames(
//                                 active ? "border" : "border-2",
//                                 checked
//                                   ? "border-indigo-500"
//                                   : "border-transparent",
//                                 "absolute -inset-px rounded-lg pointer-events-none"
//                               )}
//                               aria-hidden="true"
//                             />
//                           </>
//                         )}
//                       </RadioGroup.Option>
//                     ))}
//                   </div>
//                 </RadioGroup>

//                 {/* Payment */}
//                 <div className="mt-10 border-t border-gray-200 pt-10">
//                   <h2 className="text-lg font-medium text-gray-900">Payment</h2>

//                   <fieldset className="mt-4">
//                     <legend className="sr-only">Payment type</legend>
//                     <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
//                       {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
//                         <div
//                           key={paymentMethod.id}
//                           className="flex items-center"
//                         >
//                           {paymentMethodIdx === 0 ? (
//                             <input
//                               id={paymentMethod.id}
//                               name="payment-type"
//                               type="radio"
//                               defaultChecked
//                               className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//                             />
//                           ) : (
//                             <input
//                               id={paymentMethod.id}
//                               name="payment-type"
//                               type="radio"
//                               className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//                             />
//                           )}

//                           <label
//                             htmlFor={paymentMethod.id}
//                             className="ml-3 block text-sm font-medium text-gray-700"
//                           >
//                             {paymentMethod.title}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </fieldset>

//                   <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
//                     <div className="col-span-4">
//                       <label
//                         htmlFor="card-number"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Card number
//                       </label>
//                       <div className="mt-1">
//                         <input
//                           type="text"
//                           id="card-number"
//                           name="card-number"
//                           autoComplete="cc-number"
//                           className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                       </div>
//                     </div>

//                     <div className="col-span-4">
//                       <label
//                         htmlFor="name-on-card"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Name on card
//                       </label>
//                       <div className="mt-1">
//                         <input
//                           type="text"
//                           id="name-on-card"
//                           name="name-on-card"
//                           autoComplete="cc-name"
//                           className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                       </div>
//                     </div>

//                     <div className="col-span-3">
//                       <label
//                         htmlFor="expiration-date"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Expiration date (MM/YY)
//                       </label>
//                       <div className="mt-1">
//                         <input
//                           type="text"
//                           name="expiration-date"
//                           id="expiration-date"
//                           autoComplete="cc-exp"
//                           className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="cvc"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         CVC
//                       </label>
//                       <div className="mt-1">
//                         <input
//                           type="text"
//                           name="cvc"
//                           id="cvc"
//                           autoComplete="csc"
//                           className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-10 lg:mt-0">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Order summary
//               </h2>
//               <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
//                 <h3 className="sr-only">Items in your cart</h3>
//                 <ul role="list" className="divide-y divide-gray-200">
//                   {cartItems.map((item, index) => (
//                     <li key={index} className="flex py-6 px-4 sm:px-6">
//                       <div className="flex-shrink-0">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-20 rounded-md"
//                         />
//                       </div>

//                       <div className="ml-6 flex-1 flex flex-col">
//                         <div className="flex justify-between">
//                           <div className="min-w-0 flex-1">
//                             <h4 className="text-sm">
//                               <a
//                                 href={item.href}
//                                 className="font-medium text-gray-700 hover:text-gray-800"
//                               >
//                                 {item.name}
//                               </a>
//                             </h4>
//                             <p className="-mt-6 text-sm text-gray-500 flex items-center justify-between">
//                               <div class="description-container">
//                                 <span class="short-description">
//                                   {item.description.slice(0, 30)}....
//                                 </span>
//                                 <span class="full-description">
//                                   {item.description}
//                                 </span>
//                               </div>

//                               <button
//                                 onClick={(event) =>
//                                   handleRemoveItem(index, event)
//                                 }
//                                 className="text-red-600 hover:text-red-800 focus:outline-none"
//                               >
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   x="0px"
//                                   y="0px"
//                                   width="100"
//                                   height="100"
//                                   viewBox="0,0,256,256"
//                                   className="w-8"
//                                 >
//                                   <g
//                                     fill="#f80909"
//                                     fill-rule="nonzero"
//                                     stroke="none"
//                                     stroke-width="1"
//                                     stroke-linecap="butt"
//                                     stroke-linejoin="miter"
//                                     stroke-miterlimit="10"
//                                     stroke-dasharray=""
//                                     stroke-dashoffset="0"
//                                     font-family="none"
//                                     font-weight="none"
//                                     font-size="none"
//                                     text-anchor="none"
//                                     // style="mix-blend-mode: normal"
//                                   >
//                                     <g transform="scale(2.56,2.56)">
//                                       <path d="M46,13c-1.64497,0 -3,1.35503 -3,3v2h-10.73437c-1.7547,0 -3.38611,0.92281 -4.28906,2.42773l-1.54297,2.57227h-3.43359c-2.19733,0 -4,1.80267 -4,4c0,2.19733 1.80267,4 4,4h1.07422l3.57422,46.45898c0.23929,3.11679 2.85609,5.54102 5.98242,5.54102h32.73828c3.12633,0 5.74313,-2.42423 5.98242,-5.54102l3.57422,-46.45898h1.07422c2.19733,0 4,-1.80267 4,-4c0,-2.19733 -1.80267,-4 -4,-4h-3.43359l-1.54297,-2.57227c-0.90296,-1.50492 -2.53436,-2.42773 -4.28906,-2.42773h-10.73437v-2c0,-1.64497 -1.35503,-3 -3,-3zM46,15h8c0.56503,0 1,0.43497 1,1v2h-10v-2c0,-0.56503 0.43497,-1 1,-1zM32.26563,20h11.56641c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.57617c1.0553,0 2.02922,0.55195 2.57227,1.45703l1.52734,2.54297h-3.33398c-0.18032,-0.00255 -0.34804,0.09219 -0.43894,0.24794c-0.0909,0.15575 -0.0909,0.34838 0,0.50413c0.0909,0.15575 0.25863,0.25049 0.43894,0.24794h5h3.5c1.11667,0 2,0.88333 2,2c0,1.11667 -0.88333,2 -2,2h-54c-1.11667,0 -2,-0.88333 -2,-2c0,-1.11667 0.88333,-2 2,-2h4h34.5c0.18032,0.00255 0.34804,-0.09219 0.43894,-0.24794c0.0909,-0.15575 0.0909,-0.34838 0,-0.50413c-0.0909,-0.15575 -0.25863,-0.25049 -0.43894,-0.24794h-33.33398l1.52734,-2.54297c0.54305,-0.90508 1.51697,-1.45703 2.57227,-1.45703zM64.5,24c-0.18032,-0.00255 -0.34804,0.09219 -0.43894,0.24794c-0.0909,0.15575 -0.0909,0.34838 0,0.50413c0.0909,0.15575 0.25863,0.25049 0.43894,0.24794h2c0.18032,0.00255 0.34804,-0.09219 0.43894,-0.24794c0.0909,-0.15575 0.0909,-0.34838 0,-0.50413c-0.0909,-0.15575 -0.25863,-0.25049 -0.43894,-0.24794zM26.07813,31h47.84375l-3.56445,46.30664c-0.16071,2.09321 -1.88861,3.69336 -3.98828,3.69336h-32.73828c-2.09967,0 -3.82757,-1.60015 -3.98828,-3.69336zM38,35c-1.65109,0 -3,1.34891 -3,3v35c0,1.65109 1.34891,3 3,3c1.65109,0 3,-1.34891 3,-3v-35c0,-1.65109 -1.34891,-3 -3,-3zM50,35c-1.65109,0 -3,1.34891 -3,3v35c0,1.65109 1.34891,3 3,3c1.65109,0 3,-1.34891 3,-3v-3.5c0.00255,-0.18032 -0.09219,-0.34804 -0.24794,-0.43894c-0.15575,-0.0909 -0.34838,-0.0909 -0.50413,0c-0.15575,0.0909 -0.25049,0.25863 -0.24794,0.43894v3.5c0,1.11091 -0.88909,2 -2,2c-1.11091,0 -2,-0.88909 -2,-2v-35c0,-1.11091 0.88909,-2 2,-2c1.11091,0 2,0.88909 2,2v25.5c-0.00255,0.18032 0.09219,0.34804 0.24794,0.43894c0.15575,0.0909 0.34838,0.0909 0.50413,0c0.15575,-0.0909 0.25049,-0.25863 0.24794,-0.43894v-25.5c0,-1.65109 -1.34891,-3 -3,-3zM62,35c-1.65109,0 -3,1.34891 -3,3v1.5c-0.00255,0.18032 0.09219,0.34804 0.24794,0.43894c0.15575,0.0909 0.34838,0.0909 0.50413,0c0.15575,-0.0909 0.25049,-0.25863 0.24794,-0.43894v-1.5c0,-1.11091 0.88909,-2 2,-2c1.11091,0 2,0.88909 2,2v35c0,1.11091 -0.88909,2 -2,2c-1.11091,0 -2,-0.88909 -2,-2v-25.5c0.00255,-0.18032 -0.09219,-0.34804 -0.24794,-0.43894c-0.15575,-0.0909 -0.34838,-0.0909 -0.50413,0c-0.15575,0.0909 -0.25049,0.25863 -0.24794,0.43894v25.5c0,1.65109 1.34891,3 3,3c1.65109,0 3,-1.34891 3,-3v-35c0,-1.65109 -1.34891,-3 -3,-3zM38,36c1.11091,0 2,0.88909 2,2v35c0,1.11091 -0.88909,2 -2,2c-1.11091,0 -2,-0.88909 -2,-2v-35c0,-1.11091 0.88909,-2 2,-2zM59.49219,41.99219c-0.13261,0.00207 -0.25896,0.05673 -0.35127,0.15197c-0.0923,0.09523 -0.14299,0.22324 -0.14092,0.35584v2c-0.00255,0.18032 0.09219,0.34804 0.24794,0.43894c0.15575,0.0909 0.34838,0.0909 0.50413,0c0.15575,-0.0909 0.25049,-0.25863 0.24794,-0.43894v-2c0.00212,-0.13532 -0.0507,-0.26572 -0.1464,-0.36141c-0.0957,-0.0957 -0.22609,-0.14852 -0.36141,-0.1464z"></path>
//                                     </g>
//                                   </g>
//                                 </svg>
//                               </button>
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex-1 -mt-6 flex items-end justify-between">
//                           <p className="mt-1 text-sm font-medium text-gray-900">
//                             {item.price}
//                           </p>

//                           <div className="ml-4">
//                             <label htmlFor="quantity" className="sr-only">
//                               Quantity
//                             </label>
//                             {item.quantity}
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <dt className="text-sm">Subtotal</dt>
//                     <dd className="text-sm font-medium text-gray-900">
//                       ${calculateTotal().toFixed(2)}
//                     </dd>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <dt className="text-sm">Shipping</dt>
//                     <dd className="text-sm font-medium text-gray-900">
//                       {selectedDeliveryMethod
//                         ? selectedDeliveryMethod.price
//                         : "$0.00"}
//                     </dd>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <dt className="text-sm">Taxes (1.3%)</dt>
//                     <dd className="text-sm font-medium text-gray-900">
//                       ${calculateTax()}
//                     </dd>
//                   </div>
//                   <div className="flex items-center justify-between border-t border-gray-200 pt-6">
//                     <dt className="text-base font-medium">Total</dt>
//                     <dd className="text-base font-medium text-gray-900">
//                       ${calculateOrderTotal()}
//                     </dd>
//                   </div>
//                 </dl>

//                 <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
//                   <button
//                     type="submit"
//                     className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
//                   >
//                     Confirm order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };
// export default CheckoutPage;
