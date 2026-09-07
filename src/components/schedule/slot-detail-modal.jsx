import {
    useState,
} from "react";

import {
    Button,
    Modal,
} from "@heroui/react";


const STATUS_OPTIONS = [
    {
        value: "scheduled",
        label: "Scheduled",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "cancelled",
        label: "Cancelled",
    },
];


export default function SlotDetailModal({
    isOpen,
    onOpenChange,
    slot,
    variant,

    onUpdate,
    onDelete,

    isUpdating = false,
    isDeleting = false,
}) {
    const [
        isEditing,
        setIsEditing,
    ] = useState(false);

    const [
        form,
        setForm,
    ] = useState({
        security: "",
        email: "",
        department: "",
        startTime: "",
        endTime: "",
        status: "",
    });


    const handleStartEdit =
        () => {
            if (!slot) {
                return;
            }

            setForm({
                security:
                    slot.security ??
                    "",

                email:
                    slot.email ??
                    "",

                department:
                    slot.department ??
                    "",

                startTime:
                    slot.startTime ??
                    "",

                endTime:
                    slot.endTime ??
                    "",

                status:
                    slot.status ??
                    "scheduled",
            });

            setIsEditing(
                true,
            );
        };


    const handleChange =
        (event) => {
            const {
                name,
                value,
            } = event.target;

            setForm(
                (prev) => ({
                    ...prev,

                    [name]:
                        value,
                }),
            );
        };


    const handleCancelEdit =
        () => {
            setIsEditing(
                false,
            );
        };


    const handleSubmitUpdate =
        async () => {
            if (
                !slot?.id ||
                !onUpdate
            ) {
                return;
            }

            await onUpdate(
                slot.id,
                form,
            );

            setIsEditing(
                false,
            );

            onOpenChange(
                false,
            );
        };


    const handleDelete =
        async () => {
            if (
                !slot?.id ||
                !onDelete
            ) {
                return;
            }

            const confirmed =
                window.confirm(
                    "Are you sure you want to delete this appointment?",
                );

            if (
                !confirmed
            ) {
                return;
            }

            await onDelete(
                slot.id,
            );
        };


    const handleModalChange =
        (open) => {
            if (!open) {
                setIsEditing(
                    false,
                );
            }

            onOpenChange(
                open,
            );
        };


    if (!slot) {
        return null;
    }


    return (
        <Modal>

            <Modal.Backdrop
                variant={
                    variant
                }
                isOpen={
                    isOpen
                }
                onOpenChange={
                    handleModalChange
                }
            >

                <Modal.Container>

                    <Modal.Dialog className="sm:max-w-[420px]">

                        <Modal.CloseTrigger />


                        <Modal.Header>
                            {isEditing
                                ? "Edit appointment"
                                : "Appointment details"}
                        </Modal.Header>


                        <Modal.Body>

                            {isEditing ? (

                                <div className="space-y-4">

                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Security
                                        </label>

                                        <input
                                            name="security"
                                            value={
                                                form.security
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                        />
                                    </div>


                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={
                                                form.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                        />
                                    </div>


                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Department
                                        </label>

                                        <input
                                            name="department"
                                            value={
                                                form.department
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                        />
                                    </div>


                                    <div className="grid grid-cols-2 gap-3">

                                        <div>
                                            <label className="mb-1 block text-sm font-medium">
                                                Start time
                                            </label>

                                            <input
                                                type="time"
                                                name="startTime"
                                                value={
                                                    form.startTime
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            />
                                        </div>


                                        <div>
                                            <label className="mb-1 block text-sm font-medium">
                                                End time
                                            </label>

                                            <input
                                                type="time"
                                                name="endTime"
                                                value={
                                                    form.endTime
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            />
                                        </div>

                                    </div>


                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Status
                                        </label>

                                        <select
                                            name="status"
                                            value={
                                                form.status
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                        >

                                            {STATUS_OPTIONS.map(
                                                (
                                                    option,
                                                ) => (
                                                    <option
                                                        key={
                                                            option.value
                                                        }
                                                        value={
                                                            option.value
                                                        }
                                                    >
                                                        {
                                                            option.label
                                                        }
                                                    </option>
                                                ),
                                            )}

                                        </select>
                                    </div>

                                </div>

                            ) : (

                                <div className="space-y-2">

                                    <p>
                                        <strong>
                                            Date:
                                        </strong>{" "}
                                        {
                                            slot.date
                                        }
                                    </p>


                                    <p>
                                        <strong>
                                            Time:
                                        </strong>{" "}
                                        {
                                            slot.timeRange
                                        }
                                    </p>


                                    <p>
                                        <strong>
                                            Status:
                                        </strong>{" "}
                                        {
                                            slot.status
                                        }
                                    </p>


                                    <p>
                                        <strong>
                                            Security:
                                        </strong>{" "}
                                        {
                                            slot.security
                                        }
                                    </p>


                                    <p>
                                        <strong>
                                            Department:
                                        </strong>{" "}
                                        {
                                            slot.department
                                        }
                                    </p>


                                    <p>
                                        <strong>
                                            Email:
                                        </strong>{" "}
                                        {
                                            slot.email
                                        }
                                    </p>

                                </div>

                            )}

                        </Modal.Body>


                        <Modal.Footer>

                            {isEditing ? (

                                <div className="flex w-full gap-2">

                                    <Button
                                        className="flex-1"
                                        variant="flat"
                                        isDisabled={
                                            isUpdating ||
                                            isDeleting
                                        }
                                        onPress={
                                            handleCancelEdit
                                        }
                                    >
                                        Cancel
                                    </Button>


                                    <Button
                                        className="flex-1"
                                        color="primary"
                                        isDisabled={
                                            isUpdating ||
                                            isDeleting
                                        }
                                        onPress={
                                            handleSubmitUpdate
                                        }
                                    >
                                        {isUpdating
                                            ? "Saving..."
                                            : "Save changes"}
                                    </Button>

                                </div>

                            ) : (

                                <div className="flex w-full gap-2">

                                    <Button
                                        className="flex-1"
                                        color="danger"
                                        variant="flat"
                                        isDisabled={
                                            isDeleting ||
                                            isUpdating
                                        }
                                        onPress={
                                            handleDelete
                                        }
                                    >
                                        {isDeleting
                                            ? "Deleting..."
                                            : "Delete"}
                                    </Button>


                                    <Button
                                        className="flex-1"
                                        variant="flat"
                                        isDisabled={
                                            isDeleting ||
                                            isUpdating
                                        }
                                        onPress={
                                            handleStartEdit
                                        }
                                    >
                                        Edit
                                    </Button>


                                    <Button
                                        className="flex-1"
                                        isDisabled={
                                            isDeleting ||
                                            isUpdating
                                        }
                                        onPress={() =>
                                            handleModalChange(
                                                false,
                                            )
                                        }
                                    >
                                        Close
                                    </Button>

                                </div>

                            )}

                        </Modal.Footer>

                    </Modal.Dialog>

                </Modal.Container>

            </Modal.Backdrop>

        </Modal>
    );
}