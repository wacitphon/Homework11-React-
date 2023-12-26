const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

function Counter({item: {id, number}, hdlUpdate, onDelete}) {
  return (
    <div className='counter'>
      <button onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3>{number}</h3>
      <button onClick={() => hdlUpdate(id, 1)}> + </button>
      <button onClick={() => hdlUpdate(id, -number)}> C </button>
      <button onClick={() => onDelete(id)}> X </button>
    </div>
  );
}

function SumInfo(props) {
  const stTitle = {
    color: props.color,
    fontSize: props.size === 'big' ? '50px' : '40px',
  };
  return (
    <div className='suminfo'>
      <h1 style={{ color: props.color, fontSize: '50px' }}>Sum = 0</h1>
    </div>
  );
}

function App() {
  const [counters, setCounters] = React.useState([{id: 1, number: 0}]);

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    let idx = cloneCounters.findIndex((el) => el.id === id);
    if (cloneCounters[idx].number + num < 0) {
      return;
    }
    cloneCounters[idx].number += num;
    setCounters(cloneCounters);
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    const cloneCounters = [...counters];
    cloneCounters.push({id: newId, number: 0});
    setCounters(cloneCounters);
  };

  const hdlDeleteCounter = (id) => {
    const updatedCounters = counters.filter((counter) => counter.id !== id);
    setCounters(updatedCounters);
  };

  return (
    <>
      <h1 className='text-center'>Codecamp Academy 01</h1>
      <button className='text-center' onClick={hdlAddCounter}>
        Add Counter
      </button>
      <SumInfo color='red' size='big' />

      {counters.map((el) => (
        <Counter
          key={el.id}
          item={el}
          hdlUpdate={hdlUpdate}
          onDelete={hdlDeleteCounter}
        />
      ))}
    </>
  );
}