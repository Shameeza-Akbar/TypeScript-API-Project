import { Outlet } from 'react-router-dom';
function RootLayout() {
 return (
   <>
   <h1>MY FIRST TYPESCRIPT PROJECT</h1>
     <main>
       <Outlet />
     </main>
   </>
 );
}
export default RootLayout;
