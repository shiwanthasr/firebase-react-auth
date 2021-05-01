import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Row, Col, Image } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase"

export default function Dashboard() {

    const [ error, setError ] = useState("")
    const [ userData, setUserData ] = useState({})
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    var user = firebase.auth().currentUser;
    const firestore = firebase.firestore();

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out!")
        }
    }

    useEffect(() => {
        firestore.collection('users')
        .doc(user.uid) // change to the current user id 
        .get().then((user)=>{
            if(user.exists){
                // now you can do something with user
                //console.log(user.data())
                setUserData(user.data())
            }
        })
    }, [firestore, user.uid]);

    return (
        <>
            <Card bg="dark" text="white">
                <Card.Body>
                    <Row>
                        <Col className="text-center">
                            <Image 
                                src={`/img/${userData.role}.png`}
                                alt="profile-image"
                                height={200}
                                width={200}
                                thumbnail                            
                                fluid />
                        </Col>
                    </Row>
                    {userData && <h2 className="text-center mb-2 mt-2">Welcome, {userData.name}</h2>}
                    {userData && <h4 className="text-center mb-4">[ {userData.role} ]</h4>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
                <Card.Body>
                    <Link onClick={handleLogout} className="btn btn-danger w-100 text-center mt-2">
                        Logout
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}
