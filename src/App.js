import React from 'react'
import {useLocalStore, useObserver} from 'mobx-react'

const StoreContext = React.createContext();
// store provider wraps around all children components 
const StoreProvider = ({children})=> {
  const store = useLocalStore(() => ({
    dinosaurs : ['Triceratops']
   }))


return (<StoreContext.Provider value ={store}>{children}</StoreContext.Provider>

)
  }
   
// useContext is a hook that allows you to use 
  const DinosaurList = () => {
    const store = React.useContext(StoreContext)

     return (
       <ul>
         {store.dinosaurs.map(dinosaur => <li key={dinosaur}>{dinosaur}</li>)}
       </ul>
     )
  }

function App() {
  return (
    <StoreProvider>
     <main>
       <DinosaurList />
     </main>
    </StoreProvider>
    
  );
}

export default App;


// so this is giving the context or what ever is in the store provider the ability so that the children throughout the app can use this context where
  // where ever it is wanted or needed to be used. 

