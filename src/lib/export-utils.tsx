import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { pdf, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Types
export type ExportColumn<T = any> = {
    header: string;
    accessorKey: keyof T | string;
    cell?: (item: T) => string | number | null | undefined;
};

// --- EXCEL GENERATOR ---
export async function exportToExcel<T>(
    data: T[],
    columns: ExportColumn<T>[],
    filename: string,
    sheetName: string = "Data"
) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Define Columns
    worksheet.columns = columns.map((col) => ({
        header: col.header,
        key: col.accessorKey as string,
        width: 25, // Default width
    }));

    // Style Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2563EB" }, // Primary Blue
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.height = 30;

    // Add Data
    data.forEach((item) => {
        const rowData: Record<string, any> = {};
        columns.forEach((col) => {
            let value = (item as any)[col.accessorKey];
            if (col.cell) {
                value = col.cell(item);
            }
            rowData[col.accessorKey as string] = value;
        });
        worksheet.addRow(rowData);
    });

    // Style Data Rows (stripes)
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            if (rowNumber % 2 === 0) {
                row.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFF3F4F6" }, // Gray-100
                };
            }
            row.getCell(1).alignment = { horizontal: "center" }; // Center first column usually
        }
    });

    // Generate Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `${filename}.xlsx`);
}

// --- PDF GENERATOR ---

// Register font (Optional, standard fonts usually fine but for specific consistency we can use defaults)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/Roboto-Regular.ttf' });

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
    header: { marginBottom: 20, textAlign: 'center' },
    title: { fontSize: 18, marginBottom: 5, fontWeight: 'bold' },
    subtitle: { fontSize: 12, color: 'gray' },
    table: { width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf', borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableColHeader: { width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf', borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: '#f0f0f0' },
    tableCol: { width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf', borderLeftWidth: 0, borderTopWidth: 0 },
    tableCellHeader: { margin: 5, fontSize: 10, fontWeight: 'bold' },
    tableCell: { margin: 5, fontSize: 9 },
});

const PdfDocument = <T,>({ data, columns, title, subtitle }: { data: T[]; columns: ExportColumn<T>[]; title: string; subtitle?: string }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                <Text style={styles.subtitle}>Dicetak pada: {format(new Date(), "dd MMMM yyyy HH:mm", { locale: id })}</Text>
            </View>

            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                    {columns.map((col, i) => (
                        <View key={i} style={{ ...styles.tableColHeader, width: `${100 / columns.length}%` }}>
                            <Text style={styles.tableCellHeader}>{col.header}</Text>
                        </View>
                    ))}
                </View>

                {/* Table Body */}
                {data.map((item, rowIndex) => (
                    <View key={rowIndex} style={styles.tableRow}>
                        {columns.map((col, colIndex) => {
                            let value = (item as any)[col.accessorKey];
                            if (col.cell) {
                                value = col.cell(item);
                            }
                            // Serialize if object/boolean
                            if (typeof value === 'boolean') value = value ? "Ya" : "Tidak";
                            if (value === null || value === undefined) value = "-";

                            return (
                                <View key={colIndex} style={{ ...styles.tableCol, width: `${100 / columns.length}%` }}>
                                    <Text style={styles.tableCell}>{String(value)}</Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export async function exportToPdf<T>(
    data: T[],
    columns: ExportColumn<T>[],
    filename: string,
    title: string
) {
    const blob = await pdf(<PdfDocument data={data} columns={columns} title={title} />).toBlob();
    saveAs(blob, `${filename}.pdf`);
}
