import { type UserTypes } from "../types/UserTypes";

interface Props {
  users: UserTypes[];
  showColor: boolean;
  handleDelete: (email:string) => void
}

const UsersList = ({ users, showColor,handleDelete }: Props) => {
  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const bgColoer = index % 2 === 0 ? "#333" : "#555";
          const color = showColor ? bgColoer : "transparent";
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt="" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button 
                onClick={()=>handleDelete(user.email)}
                className="btn">Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersList;
