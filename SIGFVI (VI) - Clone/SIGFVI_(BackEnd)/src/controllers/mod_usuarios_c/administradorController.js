const db = require("../../models/sigfviDBModelo").promise();
const bcrypt = require('bcrypt');
<<<<<<< HEAD
=======
const jwt = require('jsonwebtoken')
>>>>>>> origin/Login

const Get = async (req, res) => {
  try {
    const query =  `select u.ID_Numero_Identificacion_PK as id, ti.Nombre_Identificacion as tipoId,u.Nombre_Usuario,
    u.Segundo_Nombre_Usuario,u.Apellido_Usuario,Segundo_Apellido_Usuario,u.Numero_Contacto_Usuario as telefono,
    u.Email_Usuario,Password_Usuario as contrasena,tc.Nombre_Tipo_cargo as cargo,ID_Estado_FK,e.Nombre_Estado as estado
    from usuario u 
    inner join Tipo_Cargo tc
    on tc.ID_Tipo_Cargo_PK = u.ID_Tipo_Cargo_FK
    inner join Tipo_identificacion ti
    on u.ID_Tipo_Identificacion_FKPK = ti.ID_Tipo_Identificacion_PK
    inner join Estado e
    on u.ID_Estado_FK=e.ID_Estado_PK
    where  u.ID_Tipo_Cargo_FK = 2;`;
    const [result] = await db.query(query);
    res.json(result);
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.json({ error: ".No se pudo hacer la consulta" });
  }
};

const getUpdate = async (req,res)=>{
  const {id}= req.params;
  try {
    const consulta = `select ID_Numero_Identificacion_PK as id,ID_Tipo_Identificacion_FKPK as tipoId,
    Nombre_Usuario,Segundo_Nombre_Usuario,Apellido_Usuario,Segundo_Apellido_Usuario,
    Numero_Contacto_Usuario,Email_Usuario,Password_Usuario
    from usuario where ID_Numero_Identificacion_PK = ?;`;
    const [resultado] = await db.query(consulta,[id]);
    res.json(resultado);
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.json({ error: ".No se pudo hacer la consulta" });
  }
}


const Post = async (req,res) =>{
  const { id,tipoid,name1,name2,lastname1,lastname2,cel,email,contrasena } = req.body;

  const salt = await bcrypt.genSalt(8)
  const hashContra = await bcrypt.hash(contrasena,salt);

  try {
    const create = "INSERT INTO Usuario VALUES (?,?,?,?,?,?,?,?,?,2,1);";

    await db.query(create, [id,tipoid,name1,name2,lastname1,lastname2,cel,email,hashContra]);

    res.json({mensaje: "Datos agregados exitosamente c:"})

  } catch (error) {
    console.error('datos no ingresados :c',error);
  }
}

const Put =async (req,res)=>{
    const {id}= req.params;
    const {name1,name2,lastname1,lastname2,cel,email,contrasena}= req.body;
    console.log(req.body);

    try {
        const update = 'UPDATE Usuario SET Nombre_Usuario = ?,Segundo_Nombre_Usuario = ?,Apellido_Usuario = ?,Segundo_Apellido_Usuario = ?,Numero_Contacto_Usuario = ?,Email_Usuario = ? ,Password_Usuario = ? WHERE ID_Numero_Identificacion_PK = ?;';

        await db.query(update, [name1,name2,lastname1,lastname2,cel,email,contrasena,id]);

        res.json({ mensaje: "Actualizacion done"})
    } catch (error) {
        console.error('Datos no updated :c →→ ',error);
    }
}

const cambioEstadoAdmin = async(req,res)=>{
  const {id} = req.params;
  const {state} = req.body;

  try {
      const estado = `UPDATE usuario SET ID_Estado_FK = ? WHERE ID_Numero_Identificacion_PK = ? ;`;
      await db.query(estado,[state,id]);
      res.json({message: "Estado cambiado"})
  } catch (error) {
      console.error('Edtado no cambiado',error);
      res.json('Edtado no cambiado',error);
  }
}

const Delete = async (req, res) => {
    const {id} = req.params;
  
    try {
      const delit = 'delete from Usuario where ID_Numero_Identificacion_PK = ?;';
  
      await db.query(delit, [id])
  
      res.json({message:"Delete donne"})
    } catch (error) {
      console.error('data no delited',error);
    }
  };

const autenticarUser = async(req,res)=>{
  const {idEntra,contrasenaEntra}=req.body;
  console.log(contrasenaEntra,'log1');
  try {
<<<<<<< HEAD
      const [result] = await db.query('SELECT ID_Numero_Identificacion_PK as id,Password_Usuario as contrasena FROM Usuario WHERE ID_Numero_Identificacion_PK = ?', [idEntra]);
=======
      const [result] = await db.query('SELECT ID_Numero_Identificacion_PK as id,Password_Usuario as contrasena,ID_Tipo_Cargo_FK as rol,Nombre_Usuario,Apellido_Usuario FROM Usuario WHERE ID_Numero_Identificacion_PK = ?', [idEntra]);
      // console.log(result[0].contrasena,'log2');
>>>>>>> origin/Login
      const usuario = result[0].id;

      if (usuario === idEntra) {
          const passReal = result[0].contrasena;
<<<<<<< HEAD
          console.log(passReal,'log2');
=======
          const rol = result[0].rol;
          const name = result[0].Nombre_Usuario;
          const lastname = result[0].Apellido_Usuario;
          console.log(name+' '+lastname,'log2');
>>>>>>> origin/Login
          try {
              let ingreso = await bcrypt.compare(contrasenaEntra, passReal);
              console.log('el ingreso es → ',ingreso);

              if(ingreso){
<<<<<<< HEAD
                res.json({message: "Ingreso exitoso C:"})
              }else{
                res.json({message: "Credenciales incorrectas :/"})
              }
=======
                const accessToken= jwt.sign(
                  {
                    user: usuario,
                    rol: rol
                  },
                  "ASHEEE",
                  {
                    expiresIn: "3m"
                  })

                res.json({
                  message: "Ingreso exitoso C:",
                  ingreso:true,
                  user:usuario,
                  rol:rol,
                  name:name,
                  lastname:lastname,
                  accessToken:accessToken
                });
              }else{
                res.json({message: "Credenciales incorrectas :/",ingreso:false});
              }
              
>>>>>>> origin/Login

          } catch (error) {
              console.log(`NT`,error);
          }
      }else{
          return res.status(500).json({ error: 'Usuario no encontrado en DATABASE' });
      }
  } catch (error) {
      console.log('no se pudo realizar la adquisision de id ',error);
  }

}
module.exports={
    Get,
    getUpdate,
    Post,
    Put,
    Delete,
    cambioEstadoAdmin,
    autenticarUser
}