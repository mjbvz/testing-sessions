// Elm Architecture Pattern in JavaScript
// This implements the same functionality as the Node.js server
// but as a client-side application following Elm's architecture

// MODEL
function initModel() {
    return {
        currentTime: new Date(),
        status: 'running'
    };
}

// UPDATE
function update(msg, model) {
    switch(msg.type) {
        case 'TICK':
            return { ...model, currentTime: new Date() };
        default:
            return model;
    }
}

// VIEW
function view(model) {
    const app = document.getElementById('app');
    
    const timestamp = model.currentTime.toISOString();
    const timestampMs = model.currentTime.getTime();
    
    app.innerHTML = `
        <h1>Welcome to Testing Sessions Server</h1>
        <p>This is a simple Elm-architecture application.</p>
        <p>Available endpoints:</p>
        <ul>
            <li><a href="#">/ - This home page</a></li>
            <li><a href="#status">/api/status - Server status</a></li>
            <li><a href="#time">/api/time - Current server time</a></li>
        </ul>
        <hr>
        
        <div class="status-info">
            <h2>Server Status</h2>
            <p><strong>Status:</strong> ${model.status}</p>
            <p><strong>Message:</strong> Server is working correctly</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
        </div>
        
        <hr>
        
        <div class="time-info">
            <h2>Current Server Time</h2>
            <p><strong>Time:</strong> ${timestamp}</p>
            <p><strong>Timestamp:</strong> ${timestampMs}</p>
        </div>
    `;
}

// MAIN
function main() {
    let model = initModel();
    
    // Initial render
    view(model);
    
    // Subscribe to time updates (every 1 second)
    setInterval(() => {
        model = update({ type: 'TICK' }, model);
        view(model);
    }, 1000);
}

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
