import { LockClosedIcon } from "@heroicons/react/solid";

function SigninPage() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;


//   <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: require('../images/uchumi.png')}} title="Woman holding a mug">
//   </div>
//   <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//     <div className="mb-8">
//       <p className="text-sm text-gray-600 flex items-center">
//         <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//           <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
//         </svg>
//         Members only
//       </p>
//       <div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
//       <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
//     </div>
//     <div className="flex items-center">
//       <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
//       <div className="text-sm">
//         <p className="text-gray-900 leading-none">Jonathan Reinink</p>
//         <p className="text-gray-600">Aug 18</p>
//       </div>
//     </div>
//   </div>
// </div>

        // <div className="fixed z-10 inset-0 overflow-y-auto">
        //   <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        //     <Transition.Child
        //       as={Fragment}
        //       enter="ease-out duration-300"
        //       enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //       enterTo="opacity-100 translate-y-0 sm:scale-100"
        //       leave="ease-in duration-200"
        //       leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        //       leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //     >
        //       <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        //         <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        //           <div className="sm:flex sm:items-start">
        //             <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        //               <ExclamationIcon
        //                 className="h-6 w-6 text-red-600"
        //                 aria-hidden="true"
        //               />
        //             </div>
        //             <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        //               <Dialog.Title
        //                 as="h3"
        //                 className="text-lg leading-6 font-medium text-gray-900"
        //               >
        //                 Deactivate account
        //               </Dialog.Title>
        //               <div className="mt-2">
        //                 <p className="text-sm text-gray-500">
        //                   Are you sure you want to deactivate your account? All
        //                   of your data will be permanently removed. This action
        //                   cannot be undone.
        //                 </p>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //         <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        //           <button
        //             type="button"
        //             className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        //             onClick={() => setOpen(false)}
        //           >
        //             Deactivate
        //           </button>
        //           <button
        //             type="button"
        //             className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        //             onClick={() => setOpen(false)}
        //             ref={cancelButtonRef}
        //           >
        //             Cancel
        //           </button>
        //         </div>
        //       </Dialog.Panel>
        //     </Transition.Child>
        //   </div>
        // </div>

                  // <div class="max-w-sm rounded overflow-hidden shadow-lg">
                  //   <img
                  //     class="w-full"
                  //     src="/img/card-top.jpg"
                  //     alt="Sunset in the mountains"
                  //   />
                  //   <div class="px-6 py-4">
                  //     <div class="font-bold text-xl mb-2">
                  //       The Coldest Sunset
                  //     </div>
                  //     <p class="text-gray-700 text-base">
                  //       Lorem ipsum dolor sit amet, consectetur adipisicing
                  //       elit. Voluptatibus quia, nulla! Maiores et perferendis
                  //       eaque, exercitationem praesentium nihil.
                  //     </p>
                  //   </div>
                  //   <div class="px-6 pt-4 pb-2">
                  //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  //       #photography
                  //     </span>
                  //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  //       #travel
                  //     </span>
                  //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  //       #winter
                  //     </span>
                  //   </div>
                  // </div>;