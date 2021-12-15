

const ListBestProfession = ({
  data,
}) => {
  return (
    <div className='containerContract'>
        <div key={data['Contract.Contractor.id']}>
          <p>Id: {data['Contract.Contractor.id']}</p>
          <p>Employee Name: {data['Contract.Contractor.firstName'].concat(data['Contract.Contractor.lastName'])}</p>
          <p>Profession: {data['Contract.Contractor.profession']}</p>
          <p>Total earned: {formatter.format(data.total)}</p>

        </div>
    </div>
  )

}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default ListBestProfession
