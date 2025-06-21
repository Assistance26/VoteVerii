// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register chart components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Styles for PDF document
// const pdfStyles = StyleSheet.create({
//   page: {
//     padding: 20,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   listItem: {
//     marginLeft: 15,
//     marginBottom: 3,
//   }
// });

// // PDF Document component
// const ElectionPDFDocument = ({ data }) => (
//   <Document>
//     <Page style={pdfStyles.page}>
//       <View style={pdfStyles.section}>
//         <Text style={pdfStyles.title}>{data.name} - Election Report</Text>
//         <Text style={pdfStyles.text}>Total Votes: {data.totalVotes}</Text>
//       </View>

//       <View style={pdfStyles.section}>
//         <Text style={pdfStyles.subtitle}>Candidates and Votes</Text>
//         {data.candidates.map((c) => (
//           <Text key={c.id} style={pdfStyles.listItem}>
//             {c.name}: {c.votes} votes ({((c.votes / data.totalVotes) * 100).toFixed(1)}%)
//           </Text>
//         ))}
//       </View>

//       <View style={pdfStyles.section}>
//         <Text style={pdfStyles.subtitle}>Campaign Highlights</Text>
//         {data.campaignHighlights.map((h, i) => (
//           <Text key={i} style={pdfStyles.listItem}>
//             • {h}
//           </Text>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

// const CombinedElectionReport = ({ electionId }) => {
//   const [loading, setLoading] = useState(true);
//   const [electionData, setElectionData] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     // Simulate async fetch
//     setTimeout(() => {
//       setElectionData({
//         name: `Election #${electionId}`,
//         totalVotes: 1234,
//         candidates: [
//           { id: 1, name: 'Alice', votes: 600 },
//           { id: 2, name: 'Bob', votes: 634 },
//         ],
//         campaignHighlights: [
//           'Focused on education reform',
//           'Emphasized environmental policies',
//           'Community engagement events increased',
//         ],
//       });
//       setLoading(false);
//     }, 1000);
//   }, [electionId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-48 text-gray-500 text-lg">
//         Loading election summary...
//       </div>
//     );
//   }

//   // Prepare chart data
//   const chartData = {
//     labels: electionData.candidates.map((c) => c.name),
//     datasets: [
//       {
//         label: 'Votes',
//         data: electionData.candidates.map((c) => c.votes),
//         backgroundColor: 'rgba(99, 102, 241, 0.7)', // Indigo 500
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: 'Votes per Candidate',
//         font: { size: 20 },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.parsed.y} votes`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 100,
//         },
//       },
//     },
//   };

//   return (
//     <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-10">
//       {/* Election Summary */}
//       <section>
//         <h1 className="text-4xl font-bold mb-6 text-indigo-700">{electionData.name} Summary</h1>
//         <p className="text-gray-600 mb-4 text-lg">
//           Total Votes Cast: <span className="font-semibold">{electionData.totalVotes.toLocaleString()}</span>
//         </p>

//         {/* Chart */}
//         <div className="mb-10">
//           <Bar data={chartData} options={chartOptions} />
//         </div>

//         {/* Campaign Highlights */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-3 text-indigo-600">📢 Campaign Highlights</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {electionData.campaignHighlights.map((highlight, i) => (
//               <li key={i}>{highlight}</li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* AI Summary Info */}
//       <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">🤖 AI Summary Reports</h2>

//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2 text-gray-700">🎯 Goal</h3>
//           <p className="text-gray-600 text-lg">Summarize election activities and data post-election.</p>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2 text-gray-700">🔧 Tools</h3>
//           <ul className="list-disc list-inside text-gray-600 space-y-1 text-lg">
//             <li>Ollama (<em>llama3 or mistral</em>) for summarization</li>
//             <li>LangChain.js</li>
//             <li>Math.js or lodash for data analysis</li>
//             <li>Chart.js / Recharts for visualizations</li>
//             <li>Puppeteer or React PDF for downloadable reports</li>
//             <li>MongoDB for storing data logs</li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-2 text-gray-700">🔄 Flow</h3>
//           <p className="text-gray-600 mb-3 text-lg">After voting ends, voting stats + campaign highlights are fetched.</p>
//           <h4 className="text-lg font-medium text-gray-700 mb-1">Backend:</h4>
//           <ul className="list-disc list-inside text-gray-600 space-y-1 text-lg">
//             <li>Cleans and analyzes data.</li>
//             <li>Sends key stats + text to Ollama with summarization prompt.</li>
//             <li>Summary + visuals shown in React dashboard.</li>
//             <li>Option to export as PDF.</li>
//           </ul>
//         </div>
//       </section>

//       {/* PDF Download Button */}
//       <div className="mt-10 text-center">
//         <PDFDownloadLink
//           document={<ElectionPDFDocument data={electionData} />}
//           fileName={`ElectionReport_${electionData.name.replace(/\s+/g, '')}.pdf`}
//           className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
//         >
//           {({ loading }) => (loading ? 'Preparing document...' : '📄 Download PDF Report')}
//         </PDFDownloadLink>
//       </div>
//     </div>
//   );
// };

// export default CombinedElectionReport;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const pdfStyles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 5 },
  listItem: { marginLeft: 15, marginBottom: 3 },
});

const ElectionPDFDocument = ({ data }) => (
  <Document>
    <Page style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>{data.name} - Election Report</Text>
        <Text style={pdfStyles.text}>Total Votes: {data.totalVotes}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.subtitle}>Candidates and Votes</Text>
        {data.candidates.map((c) => (
          <Text key={c.id} style={pdfStyles.listItem}>
            {c.name}: {c.votes} votes ({((c.votes / data.totalVotes) * 100).toFixed(1)}%)
          </Text>
        ))}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.subtitle}>Campaign Highlights</Text>
        {data.campaignHighlights.map((h, i) => (
          <Text key={i} style={pdfStyles.listItem}>
            • {h}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

const CombinedElectionReport = ({ electionId }) => {
  const [loading, setLoading] = useState(true);
  const [electionData, setElectionData] = useState(null);

  useEffect(() => {
    const fetchElectionSummary = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:3000/summary/${electionId}?expectedVoters=1000`
        );

        setElectionData({
          name: `Election #${electionId}`,
          totalVotes: data.stats.totalVotes,
          candidates: data.stats.candidateStats,
          campaignHighlights: data.stats.campaignHighlights.map(
            (highlight) => `${highlight.title}: ${highlight.description}`
          ),
          aiSummary: data.summaryText,
        });
      } catch (error) {
        console.error('Error fetching election summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchElectionSummary();
  }, [electionId]);

  if (loading || !electionData) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500 text-lg">
        Loading election summary...
      </div>
    );
  }

  const chartData = {
    labels: electionData.candidates.map((c) => c.name),
    datasets: [
      {
        label: 'Votes',
        data: electionData.candidates.map((c) => c.votes),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Votes per Candidate',
        font: { size: 20 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} votes`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-10">
      <section>
        <h1 className="text-4xl font-bold mb-6 text-indigo-700">{electionData.name} Summary</h1>
        <p className="text-gray-600 mb-4 text-lg">
          Total Votes Cast:{' '}
          <span className="font-semibold">{electionData.totalVotes.toLocaleString()}</span>
        </p>

        <div className="mb-10">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600">📢 Campaign Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {electionData.campaignHighlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🤖 AI Summary</h2>
        {electionData.aiSummary ? (
          <p className="text-gray-700 text-lg whitespace-pre-line">{electionData.aiSummary}</p>
        ) : (
          <p className="text-gray-500">No summary available.</p>
        )}
      </section>

      <div className="mt-10 text-center">
        <PDFDownloadLink
          document={<ElectionPDFDocument data={electionData} />}
          fileName={`ElectionReport_${electionData.name.replace(/\s+/g, '')}.pdf`}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {({ loading }) => (loading ? 'Preparing document...' : '📄 Download PDF Report')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CombinedElectionReport;
