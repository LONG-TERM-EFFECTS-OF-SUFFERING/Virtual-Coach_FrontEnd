import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const EditAccount = () => {
  return (
    <div className="bg-gray-700 width m-0 h-screen w-screen flex items-center justify-center">
        <Card className="bg-gray-100 p-8" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Editar tu cuenta
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Escribe en los campos correspondientes aquellos datos <br />
            que deseas modificar
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Nombre completo" />
              <Input type="contrasena" size="lg" label="Contraseña" />
            </div>
            <Button className="mt-6" fullWidth>
              Editar
            </Button>
          </form>
       </Card>
    </div>
  );
};

export default EditAccount;