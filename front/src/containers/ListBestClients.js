

const ListBestClients = ({
  data,
}) => {
  return (
    <div className='containerBestClients'>
      <h1>Best Clients</h1>
      {
        data.map((client) => {
          return (
            <div key={client.Contract.ClientId}>
              <p>ClientId: {client.Contract.ClientId}</p>
              <p>Client name: {client.Contract.Client.firstName.concat(client.Contract.Client.lastName)}</p>
              <p>Profession: {client.Contract.Client.profession}</p>
            </div>
          )

        })
      }
    </div>
  )

}


export default ListBestClients
