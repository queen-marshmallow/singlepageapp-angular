using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SinglePageApp.Data.Models
{
    [Table("Jobs")]
    public class Job
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        [Required]
        [StringLength(2000)]
        public string Description { get; set; }

        [Required]
        public virtual Location Location { get; set; }
        [Required]
        public virtual Organization Organization { get; set; }
        [Required]
        public virtual PositionType Positiontype { get; set; }

        [Required]
        public virtual User CreatedBy { get; set; }
       
        [Required]
        public DateTime CreatedOn { get; set; }
    }
}
