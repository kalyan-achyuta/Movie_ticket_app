import { Button, Form, Input , message } from "antd";
import {Link, useNavigate} from "react-router-dom"
import { login } from "../calls/authCalls";
import {useDispatch} from 'react-redux';
import { setUserData } from "../redux/userSlice";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
   const onSubmit = async(values) => {
       try {
           const userData = await login(values);
           if(userData.success){
               message.success("Registration Successful");
               dispatch(setUserData(userData.user))
               navigate('/home')
           } else {
               message.error(userData.message);
           }
       } catch (error) {
         console.log(error.message);
       }
     };

  return (
    <>
    <header className="App-header">
      <main
        className="main-area mw-400 text-center px-3"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section
          className="right-section"
          style={{
            width: '100%',
            maxWidth: 320,
            margin: '0 auto',
            padding: '1.25rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            borderRadius: 8,
            background: 'white',
          }}
        >
          <Form layout="vertical" onFinish={onSubmit}>
    
          <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  </>
  )
}

export default Login