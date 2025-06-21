import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext.jsx";
import { useSetupContext } from "@/Context/SetupProvider.jsx";
import { LuSend } from "react-icons/lu";
import {
  Label,
  TextInput,
  Textarea,
  Button,
  Select,
  Radio,
} from "flowbite-react";

const CreateSteps = () => {
  const { workflow } = useParams();
  const { t, locale } = useSetupContext();
  const { token } = useUserContext();
  const [roles, setroles] = useState([]);
  const [formInputData, setformInputData] = useState({
    name: "",
    description: "",
    workflow_id: workflow,
    role_id: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setroles(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roles]);

  async function submit(e) {
    e.preventDefault();
    await axios
      .post(
        `/workflows/${workflow}/steps`,
        {
          name: formInputData.name,
          description: formInputData.description,
          role_id: formInputData.role_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
            value={formInputData.name}
            onChange={(e) => {
              setformInputData({ ...formInputData, name: e.target.value });
            }}
          />
          <span
            className={`text-sm ${
              formInputData.name.length > 255
                ? "text-red-500"
                : "text-green-400"
            }`}
          >
            {formInputData.name.length}/255
          </span>
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
            value={formInputData.description}
            onChange={(e) => {
              setformInputData({
                ...formInputData,
                description: e.target.value,
              });
            }}
          />
          <span
            className={`text-sm ${
              formInputData.description.length > 1000
                ? "text-red-500"
                : "text-green-400"
            }`}
          >
            {formInputData.description.length}/1000
          </span>
        </div>

        <div className="">
          <div className="mb-2 mt-8 block">
            <div>Select the role</div>
          </div>

          <div className="flex gap-4">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center gap-2">
                <Radio id={role.id} name="role_id" value={role.id} onChange={(e) => setformInputData({...formInputData, role_id: e.target.value})}/>
                <Label htmlFor={role.id}>
                  {locale === "ar" ? role.name_ar : role.name}
                </Label>
              </div>
            ))}
          </div>
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

export default CreateSteps;
