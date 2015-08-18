using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;
using Microsoft.Framework.Runtime;
using SinglePageApp.Data;
using System.Data.Entity;

namespace SinglePageApp
{
    public class Startup
    {
        private IConfiguration _configuration;
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            _configuration = new ConfigurationBuilder(appEnv.ApplicationBasePath).AddJsonFile("config.json")
                .AddEnvironmentVariables().Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient((provider) =>
            {
                return new AppDataContext(_configuration.Get("Data:DefaultConnection:ConnectionString"));
            });

            services.AddMvc();
        }

        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            Database.SetInitializer(new AppDataInitializer());
            // Add static files to the request pipeline.
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
