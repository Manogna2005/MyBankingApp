import axios from "axios";
export default function DownloadButton({ accountNumber }) {
  const handleDownload = async () => {
    const response = await axios.get(
      `http://localhost:8080/banksimulator/transactions/${accountNumber}`,
      {
        headers: { 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
        responseType: 'blob'
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions_${accountNumber}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return <button onClick={handleDownload}>Download Transactions (Excel)</button>;
}
