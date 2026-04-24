import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileCheck, Share2 } from 'lucide-react';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff' },
  section: { margin: 10, padding: 10, border: '2px solid #2563eb', borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748b', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' },
  value: { fontSize: 16, color: '#0f172a', marginBottom: 15, fontWeight: 'bold' },
  footer: { marginTop: 50, fontSize: 10, color: '#94a3b8', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: 20 }
});

const RegistrationSlip = ({ status }: { status: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Voter Registration Guide Slip</Text>
        <Text style={styles.subtitle}>VoterGuide AI - 2026 General Elections</Text>
        
        <Text style={styles.label}>Voter Category</Text>
        <Text style={styles.value}>{status.toUpperCase()}</Text>
        
        <Text style={styles.label}>Registration Status</Text>
        <Text style={styles.value}>In Progress / Guided</Text>
        
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: '#475569', marginBottom: 10 }}>Important Next Steps:</Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>• Visit voters.eci.gov.in</Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>• Keep your Aadhaar/Passport ready</Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>• Locate your booth via the app</Text>
        </View>
        
        <Text style={styles.footer}>This is a computer-generated guidance document from VoterGuide AI. Not an official government ID.</Text>
      </View>
    </Page>
  </Document>
);

const VoterCertificate = ({ status }: { status: string }) => {
  return (
    <div className="glass-morphism p-8 rounded-[40px] border border-emerald-500/10 bg-emerald-500/5 mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 flex items-center justify-center">
            <FileCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Your Election Roadmap is Ready</h4>
            <p className="text-slate-400 text-sm">Download your personalized registration checklist as a PDF.</p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <PDFDownloadLink
            document={<RegistrationSlip status={status} />}
            fileName="voter_roadmap.pdf"
            className="flex-1 md:flex-none px-6 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2"
          >
            {({ loading }) => (
              <>
                <Download className="w-5 h-5" />
                {loading ? 'Preparing...' : 'Download PDF'}
              </>
            )}
          </PDFDownloadLink>
          
          <button 
            onClick={() => alert("Connecting to Google Drive to save your roadmap...")}
            className="flex-1 md:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <Share2 className="w-5 h-5 text-blue-400" />
            Save to Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoterCertificate;
