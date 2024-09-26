using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace PRSEntityFrameworkConsole.Models;

[Table("Vendor")]
[Index("Name", "Address", "City", "State", Name = "UQ_Vendor_Business", IsUnique = true)]
[Index("Code", Name = "UQ_Vendor_Code", IsUnique = true)]
public partial class Vendor
{
    [Key]
    public int Id { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string Code { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Address { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string City { get; set; } = null!;

    [StringLength(2)]
    [Unicode(false)]
    public string State { get; set; } = null!;

    [StringLength(5)]
    [Unicode(false)]
    public string Zip { get; set; } = null!;

    [StringLength(12)]
    [Unicode(false)]
    public string PhoneNumber { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [InverseProperty("Vendor")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public Vendor(string code, string name, string address, string city, string state, string zip, string phoneNumber, string email)
    {
        Code = code;
        Name = name;
        Address = address;
        City = city;
        State = state;
        Zip = zip;
        PhoneNumber = phoneNumber;
        Email = email;
    }

    public Vendor() { }
    public override string ToString()
    {
        return $"{Name} -Code ({Code}), - {City}, {State} ";
    }
}
