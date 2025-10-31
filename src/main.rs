use actix_web::{web, App, HttpResponse, HttpServer, Result, middleware};
use actix_cors::Cors;
use serde::Serialize;
use chrono::Utc;
use std::env;

#[derive(Serialize)]
struct StatusResponse {
    status: String,
    message: String,
    timestamp: String,
}

#[derive(Serialize)]
struct TimeResponse {
    time: String,
    timestamp: i64,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
    message: String,
}

async fn index() -> Result<HttpResponse> {
    let html = r#"
      <!DOCTYPE html>
      <html>
        <head>
          <title>Testing Sessions Server</title>
        </head>
        <body>
          <h1>Welcome to Testing Sessions Server</h1>
          <p>This is a simple Rust server.</p>
          <p>Available endpoints:</p>
          <ul>
            <li><a href="/">/ - This home page</a></li>
            <li><a href="/api/status">/api/status - Server status</a></li>
            <li><a href="/api/time">/api/time - Current server time</a></li>
          </ul>
        </body>
      </html>
    "#;
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(html))
}

async fn api_status() -> Result<HttpResponse> {
    let response = StatusResponse {
        status: "running".to_string(),
        message: "Server is working correctly".to_string(),
        timestamp: Utc::now().to_rfc3339(),
    };
    Ok(HttpResponse::Ok().json(response))
}

async fn api_time() -> Result<HttpResponse> {
    let now = Utc::now();
    let response = TimeResponse {
        time: now.to_rfc3339(),
        timestamp: now.timestamp_millis(),
    };
    Ok(HttpResponse::Ok().json(response))
}

async fn not_found(req: actix_web::HttpRequest) -> Result<HttpResponse> {
    let response = ErrorResponse {
        error: "Not Found".to_string(),
        message: format!("Path {} not found", req.path()),
    };
    Ok(HttpResponse::NotFound().json(response))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let bind_addr = format!("127.0.0.1:{}", port);
    
    println!("Server is running on http://localhost:{}", port);
    println!("Available endpoints:");
    println!("  GET /           - Home page");
    println!("  GET /api/status - Server status");
    println!("  GET /api/time   - Current time");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE]);

        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .route("/", web::get().to(index))
            .route("/api/status", web::get().to(api_status))
            .route("/api/time", web::get().to(api_time))
            .default_service(web::route().to(not_found))
    })
    .bind(&bind_addr)?
    .run()
    .await
}
