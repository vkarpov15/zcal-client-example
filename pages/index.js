import { store, fetchUserData } from '../store';

const wrapper = {
  fontFamily: 'sans-serif'
};

const errorAlert = {
  backgroundColor: '#f2dede',
  color: '#a94442',
  width: '600px',
  borderRadius: '4px',
  padding: '5px'
};

const a = {
  textDecoration: 'none',
  color: '#31708f'
};

const li = {
  marginBottom: '0.5em'
};

class App extends React.Component {
  componentWillMount() {
    this.setState(store.getState());
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentDidMount() {
    fetchUserData(new URLSearchParams(window.location.search).get('userId')).
      catch(error => { throw error; });
  }

  render() {
    if (this.state.loading) {
      return (<div style={wrapper}><h1>Loading...</h1></div>);
    }
    if (this.state.error) {
      if (this.state.error._isArchetypeError) {
        return (
          <div style={wrapper}>
            <div style={errorAlert}>
              <ul>
                {
                  Object.keys(this.state.error.errors).map(prop => {
                    return (
                      <li key={prop} style={li}>
                        <b>{prop}:</b>&nbsp;
                        {this.state.error.errors[prop].message}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        );
      }
      return (
        <div style={wrapper}>
          <div style={errorAlert}>
            {this.state.error.message}
          </div>
        </div>
      );
    }
    return (
      <div style={wrapper}>
        <h1>Calendar for {this.state.userData.name}</h1>
        <ul>
          {
            this.state.userData.events.map(event => {
              const { date, name, location } = event;
              const [lng, lat] = location.geometry.coordinates;
              return (
                <li key={date} style={li}>
                  <b>{date.getFullYear()}-{date.getMonth()}-{date.getDate()}:</b>&nbsp;
                  <a
                    style={a}
                    href={`https://www.google.com/maps/@${lat},${lng},14z`}>
                      {name}
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
