using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CroppieExample.Startup))]
namespace CroppieExample
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
