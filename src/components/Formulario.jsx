import {useState, useEffect} from 'react'
import Error from './Error'

function Formulario({pacientes, setPacientes,paciente}){
    const [nombre, setNombre] = useState('')
    const [propietaro, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')

    const[error, setError] = useState(false)

    useEffect(()=>{
        if( Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietaro)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])

    const generarId =()=>{
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handleSubmit =(e) =>{
        e.preventDefault()
        //validacion del formulario
        if([nombre, propietaro, email, fecha, sintomas].includes('')){
            console.log("hay un campo vacio")
            setError(true)
            return
        } 

        setError(false)

        //objeto de paciente
        const objetoPaciente={
            nombre,
            propietaro,
            email,
            fecha,
            sintomas,
        }

        if(paciente.id){
            //Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
        }else{
            //Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes,objetoPaciente])
        }

        //reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
   


    return(
        <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className=" text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
            {error&& <Error mensaje="Todos los campos son obligatorios"/>}
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase">Nombre Mascota</label>
                <input id="mascota" type="text" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="block text-gray-700 uppercase">Nombre del proietario</label>
                <input id="propietario" type="text" placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md" value={propietaro} onChange={(e)=>setPropietario(e.target.value)} />
            </div>

            <div className="mb-5">
                <label htmlFor="mail" className="block text-gray-700 uppercase">Email</label>
                <input id="mail" type="email" placeholder="Dirección email" className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="mb-5">
                <label htmlFor="alta" className="block text-gray-700 uppercase">Alta</label>
                <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md" value={fecha} onChange={(e)=>setFecha(e.target.value)} />
            </div>

            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase">Sintomas</label>
               <textarea 
                id="sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md"
                placeholder="Describa los sintomas"
                value={sintomas} onChange={(e)=>setSintomas(e.target.value)}
               />
            </div>

            <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer" 
            value={ paciente.id ? "Editar paciente": "Agregar paciente"} />
        </form>
   </div>
    )
}

export default Formulario