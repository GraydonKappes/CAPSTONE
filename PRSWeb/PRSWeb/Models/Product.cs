﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PRSWeb.Models;

[Table("Product")]
[Index("VendorId", "PartNumber", Name = "UQ_Product_Vid_Pnum", IsUnique = true)]
public partial class Product
{
    [Key]
    public int Id { get; set; }

    public int VendorId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string PartNumber { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Unit { get; set; } = null!;

    [InverseProperty("Product")]
    public virtual ICollection<LineItem> LineItems { get; set; } = new List<LineItem>();

    [ForeignKey("VendorId")]
    [InverseProperty("Products")]
    public virtual Vendor? Vendor { get; set; } = null!;
}