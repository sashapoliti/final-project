({
    openModal: function (component, event, helper) {
        component.set("v.isModalOpen", true);
        component.find('overlayLib').showCustomModal({
            header: "Nuova Valutazione",
            body: component.find('flowData'), // Reference to the Flow component
            showCloseButton: true,
            closeCallback: function() {
                component.set("v.isModalOpen", false); // Reset modal state on close
            }
        });
    }
})

