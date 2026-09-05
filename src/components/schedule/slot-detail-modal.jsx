import {
    Button,
    Modal,
} from "@heroui/react";

export default function SlotDetailModal({isOpen, onOpenChange,variant = "transparent", slot}) {
    if (!slot) {
        return null
    }

    const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1)

    return (
        <Modal>
            <Modal.Backdrop 
                variant={variant}
                isOpen={isOpen}
                onOpenChange={onOpenChange}    
            >
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />

                        <Modal.Header>

                        </Modal.Header>

                        <Modal.Body>
                            <div className="space-y-2">
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {slot.date}
                                </p>

                                <p>
                                    <strong>Time:</strong>{" "}
                                    {slot.timeRange}
                                    </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {slot.status}
                                </p>

                                <p>
                                    <strong>Security:</strong>{" "}
                                    {slot.security}
                                    </p>

                                <p>
                                    <strong>Department:</strong>{" "}
                                    {slot.department}
                                </p>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {slot.email}
                                </p>

                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                className="w-full"
                                onPress={() => onOpenChange(false)}
                            >
                                Continue
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}