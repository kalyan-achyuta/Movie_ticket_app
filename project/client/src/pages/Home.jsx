import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../calls/authCalls';
import { getAllMovies } from '../calls/movieCalls';
import { setUserData } from '../redux/userSlice';
import { Link } from 'react-router-dom';

import { Layout, Input, Button, Avatar, Typography, Space, Row, Col, Card, Spin } from 'antd';
import { UserOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      dispatch(setUserData(user || null));
    })();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await getAllMovies();
      if (response?.data) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    console.log("Search:", value);
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUserData(null));
  };

  const displayName = userData?.name || userData?.username || "User";

  return (
    <Layout>
      <Header style={{ background: "rgb(235, 78, 98)", display: "flex", alignItems: "center", padding: "0 20px" }}>
        
        {/* Logo / Brand */}
        <Text strong style={{ fontSize: 18 }}>BookMyShow</Text>

        {/* Search Bar */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 20px" }}>
          <Input
            placeholder="Search movies..."
            onPressEnter={(e) => onSearch(e.target.value)}
            style={{ maxWidth: 400 }}
            prefix={<SearchOutlined />}
          />
        </div>

        {/* User Info + Logout */}
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Link to="/admin">{displayName}</Link>
          <Button icon={<LogoutOutlined />} onClick={onLogout} type="default">
            Logout
          </Button>
        </Space>
      </Header>

      <div style={{ padding: 20 }}>
        <h2>Now Showing</h2>
        {loading ? (
          <Spin />
        ) : movies.length > 0 ? (
          <Row gutter={[16, 16]}>
            {movies.map((movie) => (
              <Col key={movie._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    movie.posterPath ? (
                      <img alt={movie.title} src={movie.posterPath} style={{ height: 300, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: 300, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No Image
                      </div>
                    )
                  }
                >
                  <Card.Meta
                    title={movie.title}
                    description={
                      <>
                        <p><strong>Genre:</strong> {movie.genre}</p>
                        <p><strong>Language:</strong> {movie.language}</p>
                        <p><strong>Rating:</strong> {movie.ratings}/10</p>
                        <p><strong>Duration:</strong> {movie.duration} min</p>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Text>No movies available</Text>
        )}
      </div>
    </Layout>
  );
}

export default Home;