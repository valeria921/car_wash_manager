import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../constants";
import { servicesApi, skillsApi } from "../apis";
import TableBasic from "../components/tables/TableBasic";
import CreateUpdateForm, { INPUT_TYPES } from "../components/forms/CreateUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { servicesActions, skillsActions } from "../redux/actions";

function ServicesPage() {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services.services);
    const skills = useSelector((state) => state.skills.skills);
    // const [services, setServices] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    // const [skills, setSkills] = useState([]);
    const [formMode, setFormMode] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);

    useEffect(() => {
        dispatch(servicesActions.getServices());
    }, []);

    useEffect(() => {
        dispatch(skillsActions.getSkills());
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [servicesRes, serviceTypesRes, skillsRes] = await Promise.all([
    //                 servicesApi.fetchServices(),
    //                 servicesApi.fetchServiceTypes(),
    //                 skillsApi.fetchSkills(),
    //             ]);
    //             setServices(servicesRes.data);
    //             setServiceTypes(serviceTypesRes.data);
    //             setSkills(skillsRes.data);
    //             console.log(skillsRes.data);
    //         } catch (err) {
    //             console.error("Error loading data:", err);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    const handleNewService = () => {
        setFormMode("create");
    };

    const handleUpdate = (serviceId) => {
        const found = services.find((s) => s.id === serviceId);
        setSelectedService(found);
        setFormMode("edit");
    };

    const handleDelete = async (serviceId) => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (!confirmed) return;
        dispatch(servicesActions.deleteService(serviceId));
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleCancelForm = () => {
        setSelectedService(null);
        setFormMode(null);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (formMode === "create") {
                dispatch(servicesActions.createService(data));
            } else if (formMode === "edit") {
                dispatch(
                    servicesActions.updateService({
                        ...data,
                        id: selectedService.id,
                    }),
                );
            }
            setFormMode(null);
            setSelectedService(null);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    function getTableRowButtons(serviceId) {
        if (userRole === ROLES.OWNER) {
            return [
                {
                    name: "Update",
                    className: "btn btn-primary btn-sm me-2",
                    onClick: () => handleUpdate(serviceId),
                },
                {
                    name: "Delete",
                    className: "btn btn-danger btn-sm",
                    onClick: () => handleDelete(serviceId),
                },
            ];
        }
        return [
            {
                name: "Update",
                className: "btn btn-primary btn-sm me-2",
                onClick: () => handleUpdate(serviceId),
            },
        ];
    }

    function getModifiedTableData() {
        return services.map((eachService) => {
            return {
                ...eachService,
                required_skills: eachService.required_skills
                    ? eachService.required_skills.map((skill) => skill.skill_name).join(", ")
                    : "",
                buttons: getTableRowButtons(eachService.id),
            };
        });
    }

    function convertSelectedServiceToFormValues() {
        console.log(selectedService);
        return [
            {
                label: "Service name",
                value: selectedService?.service_name ?? "",
                type: INPUT_TYPES.textInput,
                name: "service_name",
            },
            {
                label: "Default commission",
                value: selectedService?.default_commission_percentage ?? "",
                type: INPUT_TYPES.textInput,
                name: "default_commission_percentage",
                inputValueType: "number",
            },
            {
                label: "Service type",
                value: selectedService?.service_type.id ?? "",
                type: INPUT_TYPES.radioInput,
                options: serviceTypes.map((each) => ({
                    id: each.id,
                    label: each.service_type_name,
                })),
                name: "service_type",
            },
            {
                label: "Required skills",
                values: selectedService?.required_skills.map((each) => each.id) ?? [],
                type: INPUT_TYPES.checkBoxInput,
                options: skills.map((each) => ({
                    id: each.id,
                    label: each.skill_name,
                })),
                name: "required_skills",
            },
        ];
    }

    return (
        <div className="container my-4">
            <TableBasic
                tableName="All services"
                columnNames={[
                    { name: "Service name" },
                    { name: "Service type" },
                    { name: "Default commission %" },
                    { name: "Required skills" },
                    { name: "Actions" },
                ]}
                rows={getModifiedTableData()}
                rowKeysToRender={[
                    "service_name",
                    "service_type_name",
                    "default_commission_percentage",
                    "required_skills",
                ]}
            />

            {formMode && (
                <CreateUpdateForm
                    onUpdate={(values) => console.log(values)}
                    formValues={convertSelectedServiceToFormValues()}
                    onSubmit={(data) => handleFormSubmit(data)}
                    onCancel={(data) => handleCancelForm(data)}
                />
            )}

            {userRole === ROLES.OWNER && (
                <button className="btn btn-success mt-3" onClick={handleNewService}>
                    + New service
                </button>
            )}
            <br />
            <button className="btn btn-outline-secondary mt-3" onClick={handleBack}>
                ← Back
            </button>
        </div>
    );
}

export default ServicesPage;
