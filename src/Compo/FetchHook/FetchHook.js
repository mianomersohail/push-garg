import { useNavigate } from 'react-router-dom';

export default async function UseFetch(uri) {
  const navigate= useNavigate();
  const localstorate = localStorage.getItem('token');
  const response = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localstorate}`
    }
  });

  if (!response) {
    const errorText = await response.text(); 
    console.error('Error:', errorText); 
    return { error: 'Error fetching data' };
  }

  const data = await response.json();

  console.log(data);

  if (data.message =='Invalid Token') {
    navigate('/userlogin')
  } else if (data.role == 'User') {
      navigate('/paiduser');
  }else if (data.role=='Admin'){
      navigate('/AdminPanel')

  } else if (data.errormessage) {
     console.log(data.errormessage)
  } else {
      navigate('/userlogin')
  }
  return data; 
}
