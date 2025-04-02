// Define action constants
const ACTIONS = {
    // Student management actions
    SAVE_STUDENT: 'saveStudent',
    GET_STUDENT_LIST: 'studentList',
    DELETE_STUDENT: 'deleteStudent',
    UPDATE_STUDENT: 'updateStudent',
    
    // Media related actions
    CAPTURE_PHOTO: 'capturePhoto',
    CAPTURE_VIDEO: 'captureVideo',
    CAPTURE_AUDIO: 'captureAudio',
    SELECT_VIDEO: 'mediaCaptured',
    SELECT_AUDIO: 'selectAudio',
    OPEN_VIDEO: 'openVideo',
    GET_VIDEO: 'getVideo',

    SELECT_MULTIPLE_PHOTOS: 'selectMultiplePhotos',
    OPEN_POPUP: 'openPopup',
    
    // UI related actions
    OPEN_POPUP: 'openPopup',
    FORM_RESET: 'formReset',
    SHOW_TOAST: 'showToast',
    
    // Data responses from native
    STUDENT_LIST: 'studentList',
    MEDIA_CAPTURED: 'mediaCaptured',
    
    // System actions
    INIT: 'init',
    ERROR: 'error'
};
class EventBridge  {
     /**
     * Send data to React Native with standardized format
     * @param {string} action - The type of action being performed
     * @param {object} data - Data payload to send to native side
     */
     sendToNative(action, data) {
        if (window.ReactNativeWebView) {
            const message = {
                type: action,
                data: data
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(message));
            console.log(`Sent message to native: ${action}`);
        } else {
            console.warn("ReactNativeWebView not available");
        }
    }
    receiveDataFromNative(action, callback) {
        // Store the original function if it exists
        const originalHandler = window.receiveDriverData;

        // Set up the receiver function
        window.receiveDriverData = (jsonData) => {
            try {
                // Parse the incoming JSON data
                const data = JSON.parse(jsonData);
                
                // Check if the action type matches what we're expecting
                if (data.type === action) {
                    console.log(`Received data from native: ${action}`);
                    // Call the callback with the data value
                    callback(data.data);
                } else if (originalHandler) {
                    // Call the original handler for other types
                    originalHandler(jsonData);
                }
            } catch (error) {
                console.error("Error parsing data from native:", error);
            }
        };
    }

}
// Make ACTIONS available globally
window.ACTIONS = ACTIONS;