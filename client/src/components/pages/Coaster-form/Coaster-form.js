import { Component } from 'react'
import CoasterService from '../../../service/coasters.service'
import UploadService from '../../../service/upload.service'
import Spinner from './../../shared/Spinner/Spinner'

import { Form, Button, Container } from 'react-bootstrap'

class CoasterForm extends Component {

    constructor() {
        super()
        this.state = {
            coaster: {
                title: '',
                description: '',
                length: '',
                inversions: '',
                imageUrl: ''
            },
            isUploading: false
        }

        this.coasterService = new CoasterService()
        this.uploadService = new UploadService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ coaster: { ...this.state.coaster, [name]: value } })
    }

    handleSubmit(e) {

        e.preventDefault()

        this.coasterService
            .saveCoaster(this.state.coaster)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
                this.props.handleAlert(true, 'Registro guardado', 'Se ha guardado la montaña rusa en nuestra Base de Datos')
            })
            .catch(err => console.log(err))
    }

    handleFileUpload = e => {

        this.setState({ isUploading: true })

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.uploadService
            .uploadFile(uploadData)
            .then(response => {
                this.props.handleAlert(true, 'Imagen subida', 'Se ha guardado la imagen')
                this.setState({
                    isUploading: false,
                    coaster: { ...this.state.coaster, imageUrl: response.data.secure_url }
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Container>

                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type="text" name="length" value={this.state.length} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inversiones</Form.Label>
                        <Form.Control type="text" name="inversions" value={this.state.inversions} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" name="imageUrl" value={this.state.imageUrl} onChange={e => this.handleInputChange(e)} />
                    </Form.Group> */}
                    <Form.Group>
                        <Form.Label>Imagen (File) {this.state.isUploading && <Spinner />}</Form.Label>
                        <Form.Control type="file" name="imageUrl" onChange={e => this.handleFileUpload(e)} />
                    </Form.Group>
                    <Button variant="dark" block type="submit" disabled={this.state.isUploading}>{this.state.isUploading ? 'Espere, subiendo...' : 'Crear montaña rusa'}</Button>
                </Form>
            </Container>
        )
    }
}



export default CoasterForm