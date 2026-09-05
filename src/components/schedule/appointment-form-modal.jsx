import { Button, Modal } from "@heroui/react";
import { useState } from "react";

const INITIAL_FORM = {
    timeRange: "",
    status: "Scheduled",
    security: "",
    email: "",
    department: "",
};

export default function AppointmentFormModal({
    isOpen,
    onOpenChange,
    selectedDate,
    onSubmit,
}) {
    const [form, setForm] = useState(INITIAL_FORM);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setForm(INITIAL_FORM);
        onOpenChange(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            ...form,
        });

        setForm(INITIAL_FORM)
        onOpenChange(false)
    };

    return (
        <Modal>
            <Modal.Backdrop
                variant="transparent"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[460px]">
                        <Modal.CloseTrigger onPress={handleClose}/>

                        <Modal.Header>
                            <Modal.Heading>
                                Create appointment
                            </Modal.Heading>
                        </Modal.Header>

                        <form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <div className="space-y-4">

                                    {/* Date */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Date
                                        </label>

                                        <input
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            value={selectedDate ?? ""}
                                            readOnly
                                        />
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Time
                                        </label>

                                        <input
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            name="timeRange"
                                            value={form.timeRange}
                                            onChange={handleChange}
                                            placeholder="e.g. 9am - 10am"
                                            required
                                        />
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Name
                                        </label>

                                        <input
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            name="security"
                                            value={form.security}
                                            onChange={handleChange}
                                            placeholder="Appointment person"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Email
                                        </label>

                                        <input
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Department
                                        </label>

                                        <input
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            name="department"
                                            value={form.department}
                                            onChange={handleChange}
                                            placeholder="Department"
                                            required
                                        />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Status
                                        </label>

                                        <select
                                            className="w-full rounded-lg border border-default-300 px-3 py-2 outline-none"
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Scheduled">
                                                Scheduled
                                            </option>

                                            <option value="Done">
                                                Done
                                            </option>

                                            <option value="RESCHEDULED">
                                                RESCHEDULED
                                            </option>

                                            <option value="OVERDUE">
                                                OVERDUE
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onPress={handleClose}
                                >
                                    Cancel
                                </Button>

                                <Button type="submit">
                                    Save appointment
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

