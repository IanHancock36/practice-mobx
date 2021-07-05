import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

const StoreContext = React.createContext();
// store provider wraps around all children components
const StoreProvider = ({ children }) => {
	const store = useLocalStore(() => ({
		dinosaurs: [ 'Triceratops' ],
		addDino: (dino) => {
			store.dino.push(dino);
		},
    get dinoCount(){
      return store.dinosaurs.length
    }
	}));

	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

const DinosaurHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(()=>{
    <h1>{store.dinoCount}Dinosaurs!</h1>
  })
}

// useContext is a hook that allows you to use
const DinosaurList = () => {
	const store = React.useContext(StoreContext);

	return useObserver(() => <ul>{store.dinosaurs.map((dinosaur) => <li key={dinosaur}>{dinosaur}</li>)}</ul>);
};

const DinoForm = () => {
	const store = React.useContext(StoreContext);
	const [ dino, setDino ] = React.useState('');
	return (
		<form
			onSubmit={(event) => {
				store.addDino(dino);
				setDino('');
				event.preventDefault();
			}}
		>
			<input
				type="text"
				placeholder=" Add your favorite Dinosaur"
				value={dino}
				onChange={(event) => {
					setDino(event.target.value);
				}}
			/>
			<button type="submit">Add Dinosaur</button>
		</form>
	);
};

function App() {
	return (
		<StoreProvider>
			<main>
        <DinosaurHeader />
				<DinosaurList />
				<DinoForm />
			</main>
		</StoreProvider>
	);
}

export default App;

// so this is giving the context or what ever is in the store provider the ability so that the children throughout the app can use this context where
// where ever it is wanted or needed to be used.
