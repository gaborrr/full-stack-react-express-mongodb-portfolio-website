import './App.css';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ProfileDataApi from './api/ProfileDataApi';

let profileData;

function Card(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [listItem, setListItem] = React.useState({});

    return (
        <>
            <BootstrapModal
                show={modalShow}
                listItem={listItem}
                onHide={() => setModalShow(false)}
            />
            <section className="card-item text-start col-sm-12 col-md-6 col-xl-4" variant="primary" onClick={() => { setModalShow(true); setListItem(props.portfolioItem) }} >
                <div className="card-body">
                    <h2 className="card-title mb-2">{props.portfolioItem.title}</h2>
                </div>
                <div className="img-wrapper">
                    <img className="card-img-top" src={props.portfolioItem.img} alt={props.portfolioItem.imgalt} />
                </div>
            </section>
        </>
    );
}

function CardList() {

    profileData = ProfileDataApi();

    return (
        <div className="row">
            {profileData.map(portfolioItem => (
                <Card key={portfolioItem.id} portfolioItem={portfolioItem} />
            ))}
        </div>
    )
}

function BootstrapModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {(props.listItem.url && props.listItem.url.trim() !== '') &&
                        <h3><a href={props.listItem.url} target='_blank' rel="noreferrer">{props.listItem.title}</a></h3>
                    }
                    {(!props.listItem.url) &&
                        <h3>{props.listItem.title}</h3>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col col-sm-4">
                        {(props.listItem.role && props.listItem.role.trim() !== '') &&
                            <p><strong>Roles and responsibilities:</strong><br />
                                {props.listItem.role}</p>
                        }
                        {(props.listItem.cms && props.listItem.cms.trim() !== '') &&
                            <p><strong>Content Management System:</strong><br />
                                {props.listItem.cms}</p>
                        }
                        {(props.listItem.technologies && props.listItem.technologies.trim() !== '') &&
                            <p><strong>Technologies:</strong><br />
                                {props.listItem.technologies}</p>
                        }
                    </div>
                    <div className="col col-sm-8 text-center">
                        {(props.listItem.url && props.listItem.url.trim() !== '') &&
                            <a href={props.listItem.url} target='_blank' rel="noreferrer"><img className="modal-img" src={props.listItem.img} alt={props.listItem.imgalt} /></a>
                        }
                        {(!props.listItem.url) &&
                            <img className="modal-img" src={props.listItem.img} alt={props.listItem.imgalt} />
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function App() {
    return (
        <div className="App">
            <div className="navbar navbar-dark bg-dark shadow-sm pb-4 mb-4">
                <div className="container">&nbsp</div>
            </div>
            <div className="container pt-4">
                <CardList />
            </div>
            <p>&copy;  {(new Date().getFullYear())}. All rights reserved.</p>
        </div>
    );
}

export default App;
