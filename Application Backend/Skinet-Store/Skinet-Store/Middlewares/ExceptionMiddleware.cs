using Skinet_Store.Errors;
using System.Net;
using System.Text.Json;

namespace Skinet_Store.Middlewares
{
    public class ExceptionMiddleware(IHostEnvironment env, RequestDelegate next)
    {

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandelExceptionAsync(context, ex, env);
            }
        }

        private static Task HandelExceptionAsync(HttpContext context, Exception ex, IHostEnvironment env)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment() ? new ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace) : 
                                                 new ApiErrorResponse(context.Response.StatusCode, ex.Message, "Internal Server Error");

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            var jsonResponse = JsonSerializer.Serialize(response, options);

            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
