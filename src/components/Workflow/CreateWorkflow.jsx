import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { LuSend } from "react-icons/lu";
import { useSetupContext } from "@/Context/SetupProvider.jsx";
import { useUserContext } from "@/Context/UserContext.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateWorkflow = () => {
  const { t } = useSetupContext();
  const { token } = useUserContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({name: "", description: ""});
  const [formInput, setformInput] = useState({ name: "", description: "" });

  async function submit(e) {
    e.preventDefault();
    if (formInput.name.length === 0) {
      setErrors({...errors, name: t("Name is required")});
      return;
    } else if (formInput.name.length > 255) {
      setErrors({...errors, name: t("Name is too long")});
      return;
    }

    await axios
      .post("/workflows", formInput, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const id = res.data.data.id;
        navigate(`/workflows/${id}/steps`);
      });
  }

  return (
    <>
      <form onSubmit={submit}>
        <div className="mb-6">
          <Label htmlFor="name" className="block mb-2">
            {t("Name")}
          </Label>
          <TextInput
            id="name"
            type="text"
            sizing="lg"
            placeholder={t("Name")}
            autoComplete="off"
            value={formInput.name}
            onChange={(e) => {
              setErrors({...errors, name: ""});
              setformInput({ ...formInput, name: e.target.value });
            }}
          />
          <span
            className={`text-sm ${
              formInput.name.length > 255 ? "text-red-500" : "text-green-400"
            }`}
          >
            {formInput.name.length}/255
          </span>
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="description" className="block mb-2">
            {t("Description")}
          </Label>
          <Textarea
            id="description"
            placeholder={t("Description")}
            rows={4}
            autoComplete="off"
            className="placeholder:text-blue-400"
            value={formInput.description}
            onChange={(e) =>{
              setErrors({...errors, description: ""});
              setformInput({ ...formInput, description: e.target.value })
            }}
          />
          <span
            className={`text-sm ${
              formInput.description.length > 1000
                ? "text-red-500"
                : "text-green-400"
            }`}
          >
            {formInput.description.length}/1000
          </span>
        </div>

        <div className="flex justify-end">
          <Button color="purple" className="mt-4" type="submit">
            <LuSend className="mr-2 rtl:ml-2" />
            {t("Submit")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateWorkflow;
