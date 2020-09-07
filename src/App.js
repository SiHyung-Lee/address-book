import React from 'react';
import Header from './Components/Header';
import PhoneForm from './Routes/PhoneForm';

class App extends React.Component {
    handleCreate = (data) => {
        console.log(data);
    };
    render() {
        return (
            <>
                <Header />
                <PhoneForm onCreate={this.handleCreate} />
            </>
        );
    }
}

export default App;
