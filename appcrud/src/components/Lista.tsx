import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { iEmpleado } from "../interface/iEmpleado"
import { Container,Row,Col, Table,Button } from "reactstrap"


export function Lista(){

    const [empleados, setEmpleados] = useState<iEmpleado[]>([])

    const obtenerEmpleados = async()=>{
        const response = await fetch(`${appsettings.apiURL}Empleado/Lista`);            
        if(response.ok){
            const data = await response.json();                
            setEmpleados(data);
        }
    }

    useEffect(() => {

        obtenerEmpleados();

    },[])

    const Eliminar = (id:number) => {

        Swal.fire({
            title: "Estas Seguro?",
            text: "Eliminar empleado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si Eliminar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiURL}Empleado/Eliminar/${id}`,{method:"DELETE"})
                if(response.ok) await obtenerEmpleados()
            }
          });

    }


    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                   <h4>Lista de empleados</h4>
                   <hr/>
                   <Link className="btn btn-success mb-3" to={"/nuevoempleado"}>Nuevo Empleado</Link>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>correo</th>
                                <th>Sueldo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empleados.map((item)=> (
                                    <tr key={item.idEmpleado}>
                                        <td>{item.nombre}</td>
                                        <td>{item.correo}</td>
                                        <td>{item.sueldo}</td>
                                        <td>
                                        <Link className="btn btn-primary me-3" to={`/editarempleado/${item.idEmpleado}`}>Editar Empleado</Link>
                                        <Button color="danger" onClick={() => {Eliminar(item.idEmpleado!)}}>Eliminar Empleado</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    )
}