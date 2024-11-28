
import './Login.css'
import RootLayout from '../Components/RootLayout';

/* export default function Login() {
  const navigate = useNavigate();
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    const authData = enteredValues;
    console.log(enteredValues);
    const response = fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
  body: JSON.stringify(authData),  
  })
  .then((response) => {
    if (response.ok) {
      console.log('Response is OK', response.ok);
      return response.json();
    }
    else {
      console.error('Response is not OK', response .status, response.statusText);
    throw new Error ('Failed to autenticate');
    }
  })
  .then((data) => {
    console.log(data);
    localStorage.setItem('token',data.token);
    localStorage.setItem('role',data.role);
    navigate ('/');
    
  })
  .then(()=> {
    navigate ('/');
  });
  }
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => (
      {
        ...prevValues, [identifier]: value
      }
    ));
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(event) => handleInputChange('password', event.target.value)} value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button" type='submit'>Login</button>
      </p>
    </form>
  );
} */
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  export default function Login() {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      category: 'cliente', // valor padrão
    });
  
    function handleInputChange(identifier, value) {
      setFormData((prevValues) => ({
        ...prevValues,
        [identifier]: value,
      }));
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
      const endpoint = isRegistering
        ? 'http://localhost:3000/register'
        : 'http://localhost:3000/login';
  
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to process request');
        }
  
        const data = await response.json();
        if (!isRegistering) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          navigate('/');
        } else {
          alert('Registro bem-sucedido! Faça login para continuar.');
          setIsRegistering(false);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  
    return (
        <form onSubmit={handleSubmit} className="form-container">
        <h2>{isRegistering ? 'Registro' : 'Login'}</h2>
      
        {isRegistering && (
          <>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(event) => handleInputChange('name', event.target.value)}
                required
              />
            </div>
      
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(event) => handleInputChange('category', event.target.value)}
                required
              >
                <option value="gestor">Gestor</option>
                <option value="cozinha">Cozinha</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>
          </>
        )}
      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(event) => handleInputChange('email', event.target.value)}
            required
          />
        </div>
      
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) => handleInputChange('password', event.target.value)}
            required
          />
        </div>
      
        <button type="submit" className="submit-btn">
          {isRegistering ? 'Registrar' : 'Entrar'}
        </button>
      
        <p>
          {isRegistering ? (
            <>
              Já tem uma conta?{' '}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsRegistering(false)}
              >
                Faça login
              </button>
            </>
          ) : (
            <>
              Não tem uma conta?{' '}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsRegistering(true)}
              >
                Registre-se
              </button>
            </>
          )}
        </p>
      </form>      
    );
  }
  