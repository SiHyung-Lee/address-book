import React from 'react';
import Header from './Components/Header';
import { firestore } from './firebase';

class App extends React.Component {
    componentDidMount() {
        firestore
            .collection('address')
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    console.log(doc.data());
                });
            });
    }

    render() {
        return (
            <>
                <Header />
            </>
        );
    }
}

export default App;
