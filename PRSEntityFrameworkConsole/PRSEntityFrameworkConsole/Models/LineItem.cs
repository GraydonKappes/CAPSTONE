using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PRSEntityFrameworkConsole.Db;

namespace PRSEntityFrameworkConsole.Models;

[Table("LineItem")]
[Index("RequestId", "ProductId", Name = "UQ_LineItem_Req_Prod", IsUnique = true)]
public partial class LineItem
{
    [Key]
    public int Id { get; set; }

    public int RequestId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("LineItems")]
    public virtual Product Product { get; set; } = null!;

    [ForeignKey("RequestId")]
    [InverseProperty("LineItems")]
    public virtual Request Request { get; set; } = null!;

    public LineItem(int requestId, int productId, int quantity)
    {
        RequestId = requestId;
        ProductId = productId;
        Quantity = quantity;
    }

    public LineItem() { }
    public override string ToString()
    {
        return $"Id- {Id} RequestId- {RequestId}, ProductId {ProductId}, Quantity- {Quantity}";
    }
}
