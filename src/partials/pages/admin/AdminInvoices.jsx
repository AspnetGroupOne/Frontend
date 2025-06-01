import React, { useEffect, useState } from "react";

const AdminInvoices = () => {
  const [Invoices, SetInvoices] = useState([]);
  const [Loading, SetLoading] = useState([true]);
  const [SelectedInvoice, SetSelectedInvoice] = useState([]);
  const [TotalPriceNOVAT, SetTotalPriceNoVAT] = useState([0]);
  const [TotalVAT, SetTotalVAT] = useState([0]);
  const [TotalPriceVAT, SetTotalPriceVAT] = useState([0]);
  const [FinalPrice, SetFinalPrice] = useState([0]);

  const CalculateInvoiceTotal = (lineItems) => {
    const total = 0;
    for (const lineItem in lineItems) {
      total += lineItem.Quantity * lineItem.PriceNoVAT;
    }
    return total;
  };

  const CalculateInvoiceVAT = (lineItems) => {
    const totalVAT = 0;
    for (const lineItem in lineItems) {
      total += lineItem.Quantity * lineItem.VAT;
    }
    return total;
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          "http://localhost:7039/api/GetAllInvoices"
        );
        let result;
        result = await response.json();
        SetInvoices(result);
      } catch (error) {
        console.error("Unable to retrieve Invoices");
        return (
          <h2>
            Unable to retrieve invoices please try again or contact the sites
            administrator
          </h2>
        );
      }
      SetLoading(false);
    };
    fetchInvoices();
  }, []);

  const handleSelect = (id) => {
    SetSelectedInvoice(Invoices.id);
  };

  if (Loading) {
    return <h2>Retrieving Invoices</h2>;
  }

  if (Invoices == null) {
    return <h2>No invoices found</h2>;
  }

  return (
    <div>
      <h2>Invoices Admin</h2>
      <ul className="InvoiceList">
        {Invoices.map((invoice) => (
          <li
            key={invoice.id}
            className={`InvoiceListItem ${
              invoice.id == SelectedInvoice.id ? "SelectedInvoice" : ""
            }`}
            onClick={handleSelect(invoice.id)}
          >
            <span>{invoice.InvoiceNumber}</span>
            <span>{invoice.Due}</span>
            <span>{CalculateInvoiceTotal(invoice.LineItems)}</span>
            <span>{invoice.InvoiceStatusName}</span>
          </li>
        ))}
      </ul>

      <article className={`InvoiceDetail" ${
        SelectedInvoice == null ? "HideInvoiceDetail" : ""
      }`}>
        {(TotalPriceNOVAT = CalculateInvoiceTotal(SelectedInvoice.LineItems))}
        {(TotalVAT = CalculateInvoiceVAT(SelectedInvoice.LineItems))}
        {(TotalPriceVAT = TotalPriceNOVAT + TotalVAT)}
        {(FinalPrice = TotalPriceVAT + SelectedInvoice.Fee)}
        <nav>
          <h2>Invoice Details</h2>
          <div>
            <button>Download</button>
            <button>Arrow Left</button>
            <button>Arrow Right</button>
          </div>
        </nav>
        <header>
          <h3>#{SelectedInvoice.InvoiceNumber}</h3>
          <h4>{SelectedInvoice.InvoiceStatusName}</h4>
          <span>Issued Date {SelectedInvoice.InvoiceDate}</span>
          <span>Due Date {SelectedInvoice.Due}</span>
        </header>
        <section>
          <span>Bill from</span>
          <h5>{SelectedInvoice.CompanyName}</h5>
          <div>
            <span>
              {SelectedInvoice.CompanyStreetName} + "" +{" "}
              {SelectedInvoice.CompanyStreetNumber}
            </span>
            <span>{SelectedInvoice.CompanyCityName}</span>
            <span>{SelectedInvoice.CompanyPostalCode}</span>
          </div>
          <span>{SelectedInvoice.CompanyEmail}</span>
          <span>{SelectedInvoice.CompanyPhoneNumber}</span>
        </section>
        <section>
          <span>Bill to</span>
          <h5>
            {SelectedInvoice.FirstName} + " " + {SelectedInvoice.LastName}
          </h5>
          <div>
            <span>
              {SelectedInvoice.StreetName} + "" + {SelectedInvoice.StreetNumber}
            </span>
            <span>{SelectedInvoice.CityName}</span>
            <span>{SelectedInvoice.PostalCode}</span>
          </div>
          <span>{SelectedInvoice.Email}</span>
          <span>{SelectedInvoice.PhoneNumber}</span>
        </section>
        <section>
          <h4>Ticket Details</h4>
          <header>
            <span>Ticket Category</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Amount</span>
          </header>
          <ul>
            {SelectedInvoice.LineItems.map((LineItem) => (
              <div>
                <span>{LineItem.LineItemName}</span>
                <span>"$"+{LineItem.PriceNoVAT}</span>
                <span>{LineItem.Quantity}</span>
                <span>"$"+{LineItem.Quantity * LineItem.PriceNoVAT}</span>
              </div>
            ))}
          </ul>
          <div>
            <span>Sub Total</span>
            <span>"$"+{TotalPriceNOVAT}</span>
          </div>
          <div>
            <span>Tax ({SelectedInvoice.LineItems[0].VATPercent})</span>
            <span>"$"+{TotalVAT}</span>
          </div>
          <div>
            <span>Fee</span>
            <span>"$"+{SelectedInvoice.InvoiceFee}</span>
          </div>
          <section>
            <span>Total</span>
            <span>"$"{FinalPrice}</span>
          </section>
          <aside>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            deserunt sed voluptate perferendis quia optio non ipsa voluptatem.
            Beatae aspernatur voluptate impedit et quam, quaerat sit incidunt
            adipisci eum voluptates?
          </aside>
        </section>
        <section>
          <ul>
            <li>
              <button>Edit Invoice</button>
            </li>

            <li>
              <button>Send Invoice</button>
            </li>

            <li>
              <button>Hold Invoice</button>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default AdminInvoices;
