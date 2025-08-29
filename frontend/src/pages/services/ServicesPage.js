import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { servicesActions, serviceTypesActions, skillsActions } from "../../redux/actions";

import { ROLES, STORAGE_KEYS } from "../../constants";

import TableBasic from "../../components/tables/TableBasic";
import TableWithUpdate from "../../components/tables/TableWithUpdate";
import CreateUpdateForm, { INPUT_TYPES } from "../../components/forms/CreateUpdateForm";
import ButtonBasic, { BUTTON_TYPES } from "../../components/buttons/ButtonBasic";

import "./style.css";
import "../main.css";

const FORM_MODES = {
    CREATE_SERVICE: "CREATE_SERVICE",
    EDIT_SERVICE: "EDIT_SERVICE",
    CREATE_SERVICE_TYPE: "CREATE_SERVICE_TYPE",
    EDIT_SERVICE_TYPE: "EDIT_SERVICE_TYPE",
};

function ServicesPage() {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services.services);
    const skills = useSelector((state) => state.skills.skills);
    const serviceTypes = useSelector((state) => state.serviceTypes.serviceTypes);
    const [formMode, setFormMode] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const navigate = useNavigate();

    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);

    console.log(serviceTypes);

    useEffect(() => {
        dispatch(servicesActions.getServices());
        dispatch(serviceTypesActions.getServiceTypes());
        dispatch(skillsActions.getSkills());
    }, []);

    const handleNewService = () => {
        setSelectedService(null);
        setFormMode(FORM_MODES.CREATE_SERVICE);
    };

    const handleUpdateService = (serviceId) => {
        const found = services.find((s) => s.id === serviceId);
        setSelectedService(found);
        setFormMode(FORM_MODES.EDIT_SERVICE);
    };

    const handleDeleteService = async (serviceId) => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (!confirmed) return;
        dispatch(servicesActions.deleteService(serviceId));
    };

    const handleNewServiceType = () => {
        setSelectedService(null);
        setFormMode(FORM_MODES.CREATE_SERVICE_TYPE);
    };

    const handleUpdateServiceType = (serviceTypeId) => {
        const found = serviceTypes.find((s) => s.id === serviceTypeId);
        console.log(found);
        setSelectedServiceType(found);
        setFormMode(FORM_MODES.EDIT_SERVICE_TYPE);
    };

    const handleDeleteServiceType = async (serviceTypeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this service typy?");
        if (!confirmed) return;
        dispatch(serviceTypesActions.deleteServiceType(serviceTypeId));
    };

    const handleCancelForm = () => {
        setSelectedService(null);
        setFormMode(null);
    };

    const handleServiceFormSubmit = async (data) => {
        try {
            if (formMode === FORM_MODES.CREATE_SERVICE) {
                dispatch(servicesActions.createService(data));
            } else if (formMode === formMode.EDIT_SERVICE) {
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

    const handleServiceTypeFormSubmit = (data) => {
        try {
            if (formMode === FORM_MODES.CREATE_SERVICE_TYPE) {
                dispatch(serviceTypesActions.createServiceType(data));
            } else if (formMode === FORM_MODES.EDIT_SERVICE_TYPE) {
                dispatch(
                    serviceTypesActions.updateServiceType({
                        ...data,
                        id: selectedServiceType.id,
                    }),
                );
            }
            setFormMode(null);
            setSelectedService(null);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const handleServiceTypeUpdate = (data) => {
        dispatch(
            serviceTypesActions.updateServiceType({
                ...data,
            }),
        );
    };

    function getServiceTableRowButtons(serviceId) {
        if (userRole === ROLES.OWNER) {
            return [
                {
                    name: "Update",
                    onClick: () => handleUpdateService(serviceId),
                    buttonType: BUTTON_TYPES.PRIMARY,
                },
                {
                    name: "Delete",
                    onClick: () => handleDeleteService(serviceId),
                    buttonType: BUTTON_TYPES.SECONDARY,
                },
            ];
        }
        return [
            {
                name: "Update",
                onClick: () => handleUpdateService(serviceId),
                buttonType: BUTTON_TYPES.PRIMARY,
            },
        ];
    }

    function getServiceTypeTableRowButtons(serviceTypeId) {
        if (userRole === ROLES.OWNER) {
            return [
                {
                    name: "Update",
                    onClick: () => handleUpdateServiceType(serviceTypeId),
                    buttonType: BUTTON_TYPES.PRIMARY,
                },
                {
                    name: "Delete",
                    onClick: () => handleDeleteServiceType(serviceTypeId),
                    buttonType: BUTTON_TYPES.SECONDARY,
                    buttonAction: "Delete"
                },
            ];
        }
        return [
            {
                name: "Update",
                onClick: () => handleUpdateServiceType(serviceTypeId),
                buttonType: BUTTON_TYPES.PRIMARY,
            },
        ];
    }

    function getServiceModifiedTableData() {
        return services.map((eachService) => {
            return {
                ...eachService,
                required_skills: eachService.required_skills
                    ? eachService.required_skills.map((skill) => skill.skill_name).join(", ")
                    : "",

                service_type_name: eachService.service_type.service_type_name,
                buttons: getServiceTableRowButtons(eachService.id),
            };
        });
    }

    function getServiceTypeModifiedTableData() {
        return serviceTypes.map((eachServiceType) => {
            return {
                ...eachServiceType,
                buttons: getServiceTypeTableRowButtons(eachServiceType.id),
            };
        });
    }

    function convertSelectedServiceToFormValues() {
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
                value: selectedService?.service_type.id,
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

    function convertSelectedServiceTypeToFormValues() {
        console.log("SElected Service Type ", selectedServiceType);
        return [
            {
                label: "Service type name",
                value: selectedServiceType?.service_type_name ?? "",
                type: INPUT_TYPES.textInput,
                name: "service_type_name",
            },
        ];
    }

    return (
        <div class="page-content">
            <TableBasic
                tableName="All services"
                columnNames={[
                    { name: "Service name" },
                    { name: "Service type" },
                    { name: "Default commission %" },
                    { name: "Required skills" },
                    { name: "Actions" },
                ]}
                rows={getServiceModifiedTableData()}
                rowKeysToRender={[
                    "service_name",
                    "service_type_name",
                    "default_commission_percentage",
                    "required_skills",
                ]}
            />

            {(formMode === FORM_MODES.CREATE_SERVICE || formMode === FORM_MODES.EDIT_SERVICE) && (
                <CreateUpdateForm
                    formValues={convertSelectedServiceToFormValues()}
                    onSubmit={(data) => handleServiceFormSubmit(data)}
                    onCancel={(data) => handleCancelForm(data)}
                />
            )}
            {userRole === ROLES.OWNER && (
                <ButtonBasic
                    buttonType={BUTTON_TYPES.SUCCESS}
                    extraClasses={"bigButton spaceBottom"}
                    onClick={handleNewService}
                >
                    + New service
                </ButtonBasic>
            )}

            <TableWithUpdate
                tableName="All service types"
                columnNames={[{ name: "Service type" }, { name: "Actions" }]}
                rows={getServiceTypeModifiedTableData()}
                rowKeysToRender={["service_type_name"]}
                rowsToEdit={[{ name: "service_type_name" }]}
                onSubmit={(data) => {
                    handleServiceTypeUpdate(data);
                }}
                onDelete={(id) => handleDeleteServiceType(id)}
            />

            {(formMode === FORM_MODES.CREATE_SERVICE_TYPE ||
                formMode === FORM_MODES.EDIT_SERVICE_TYPE) && (
                <CreateUpdateForm
                    formValues={convertSelectedServiceTypeToFormValues()}
                    onSubmit={(data) => handleServiceTypeFormSubmit(data)}
                    onCancel={(data) => handleCancelForm(data)}
                />
            )}
            {userRole === ROLES.OWNER && (
                <ButtonBasic
                    buttonType={BUTTON_TYPES.SUCCESS}
                    extraClasses={"bigButton"}
                    onClick={handleNewServiceType}
                >
                    + New service type
                </ButtonBasic>
            )}
        </div>
    );
}

export default ServicesPage;
