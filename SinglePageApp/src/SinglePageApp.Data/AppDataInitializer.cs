using SinglePageApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace SinglePageApp.Data
{
    public class AppDataInitializer : DropCreateDatabaseIfModelChanges<AppDataContext>
    {
        protected override void Seed(AppDataContext context)
        {
            var organizations = new List<Organization>
            {
                new Organization { Name = "Holistic Solutions IT" },
                new Organization { Name = "Strategic Channels IT" }
            };

            organizations.ForEach(t => context.Organizations.Add(t));


            var roles = new List<PositionType>
            {
                new PositionType { Name = "Software Engineer" },
                new PositionType { Name = "UX Designer" },
                new PositionType { Name = "Program Manager" }
            };

            roles.ForEach(t => context.PositionTypes.Add(t));

            base.Seed(context);
        }
    }
}
