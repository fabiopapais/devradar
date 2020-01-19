import React from 'react';

import Routes from './src/routes'

export default function App() {
  return (
    <Routes />
  );
}

// NÃO existe herança de estilização!!!
// Cada elemento deve ter sua própria estilização!

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFF',
  },
});
