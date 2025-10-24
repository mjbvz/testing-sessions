use actix_web::{web, App, HttpResponse, HttpServer, Result};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Serialize, Deserialize)]
struct StatusResponse {
    status: String,
    message: String,
    timestamp: String,
}

#[derive(Serialize, Deserialize)]
struct TimeResponse {
    time: String,
    timestamp: i64,
}

#[derive(Serialize, Deserialize)]
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

async fn status() -> Result<HttpResponse> {
    let response = StatusResponse {
        status: "running".to_string(),
        message: "Server is working correctly".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };
    Ok(HttpResponse::Ok().json(response))
}

async fn time() -> Result<HttpResponse> {
    let now = chrono::Utc::now();
    let response = TimeResponse {
        time: now.to_rfc3339(),
        timestamp: now.timestamp_millis(),
    };
    Ok(HttpResponse::Ok().json(response))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let port = env::var("PORT")
        .unwrap_or_else(|_| "3000".to_string())
        .parse::<u16>()
        .expect("PORT must be a valid number");

    println!("Server is running on http://localhost:{}", port);
    println!("Available endpoints:");
    println!("  GET /           - Home page");
    println!("  GET /api/status - Server status");
    println!("  GET /api/time   - Current time");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE])
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/", web::get().to(index))
            .route("/api/status", web::get().to(status))
            .route("/api/time", web::get().to(time))
            .default_service(web::to(|| async {
                let response = ErrorResponse {
                    error: "Not Found".to_string(),
                    message: "Path not found".to_string(),
                };
                HttpResponse::NotFound().json(response)
            }))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
