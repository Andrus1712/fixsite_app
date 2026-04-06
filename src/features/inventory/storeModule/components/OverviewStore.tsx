import type { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { Text } from "../../../../shared/components";

// ---------- STYLED COMPONENTS ----------

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ active: boolean; }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  background: ${(props) => (props.active ? "#2563eb" : "#e5e7eb")};
  color: ${(props) => (props.active ? "#fff" : "#111")};
  transition: 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;

// ---------- COMPONENT ----------

export const OverviewStore = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const kpis = [
        { title: "Total Articles", value: 1240 },
        { title: "Total Units", value: 8450 },
        { title: "Low Stock Items", value: 32 },
        { title: "Pending Approvals", value: 7 },
    ];

    const inboundOutboundOptions: ApexOptions = {
        chart: {
            type: "line",
            zoom: {
                enabled: true,
                type: "x", // "x", "y" o "xy"
                autoScaleYaxis: true,
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
            },
        },
        stroke: { curve: "smooth", width: 3 },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
    };

    const inboundOutboundSeries = [
        { name: "Inbound", data: [120, 90, 140, 180, 160, 210] },
        { name: "Outbound", data: [100, 110, 130, 150, 170, 190] },
    ];

    const stockByCategoryOptions: ApexOptions = {
        labels: ["Electrical", "Mechanical", "Hydraulic", "Tools"],
        legend: { position: "bottom" },
    };

    const stockByCategorySeries = [40, 30, 20, 10];

    const topArticlesOptions: ApexOptions = {
        chart: { type: "bar", toolbar: { show: false } },
        plotOptions: {
            bar: { horizontal: true },
        },
        xaxis: {
            categories: [
                "Bearing X12",
                "Seal Kit A3",
                "Bolt M8",
                "Motor 220V",
                "Valve H2",
            ],
        },
    };

    const topArticlesSeries = [
        { name: "Movements", data: [320, 280, 250, 200, 150] },
    ];

    return (
        <>
            <Tabs>
                <TabButton
                    active={activeTab === "overview"}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </TabButton>

                <TabButton
                    active={activeTab === "analytics"}
                    onClick={() => setActiveTab("analytics")}
                >
                    Analytics
                </TabButton>
            </Tabs>

            {activeTab === "overview" && (
                <>
                    <KpiGrid>
                        {kpis.map((kpi, index) => (
                            <Card key={index}>
                                <h3>{kpi.title}</h3>
                                <p>{kpi.value}</p>
                            </Card>
                        ))}
                    </KpiGrid>

                    <ChartGrid>
                        <Card>
                            <h3>Inbound vs Outbound</h3>
                            <Chart
                                options={inboundOutboundOptions}
                                series={inboundOutboundSeries}
                                type="line"
                                height={300}
                            />
                        </Card>

                        <Card>
                            <h3>Stock by Category</h3>
                            <Chart
                                options={stockByCategoryOptions}
                                series={stockByCategorySeries}
                                type="donut"
                                height={300}
                            />
                        </Card>
                    </ChartGrid>
                </>
            )}

            {activeTab === "analytics" && (
                <Card>
                    <h3>Top 5 Most Moved Articles</h3>
                    <Chart
                        options={topArticlesOptions}
                        series={topArticlesSeries}
                        type="bar"
                        height={350}
                    />
                </Card>
            )}
            <Text variant="caption">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro sequi minima excepturi quas culpa quae nulla? Voluptatum, earum. Consequatur et maxime unde ut vitae ipsam numquam quis earum illum eius.Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero perferendis ducimus corporis, doloremque eaque necessitatibus. Iste, provident temporibus nesciunt quis fugit illo consequuntur omnis? Aspernatur eaque veritatis placeat voluptatem vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ut aliquid excepturi beatae assumenda ipsa atque quisquam, sequi doloribus possimus nobis sapiente, dolor accusantium sint maxime animi nisi exercitationem laborum?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro sequi minima excepturi quas culpa quae nulla? Voluptatum, earum. Consequatur et maxime unde ut vitae ipsam numquam quis earum illum eius.Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero perferendis ducimus corporis, doloremque eaque necessitatibus. Iste, provident temporibus nesciunt quis fugit illo consequuntur omnis? Aspernatur eaque veritatis placeat voluptatem vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ut aliquid excepturi beatae assumenda ipsa atque quisquam, sequi doloribus possimus nobis sapiente, dolor accusantium sint maxime animi nisi exercitationem laborum?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro sequi minima excepturi quas culpa quae nulla? Voluptatum, earum. Consequatur et maxime unde ut vitae ipsam numquam quis earum illum eius.Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero perferendis ducimus corporis, doloremque eaque necessitatibus. Iste, provident temporibus nesciunt quis fugit illo consequuntur omnis? Aspernatur eaque veritatis placeat voluptatem vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ut aliquid excepturi beatae assumenda ipsa atque quisquam, sequi doloribus possimus nobis sapiente, dolor accusantium sint maxime animi nisi exercitationem laborum?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro sequi minima excepturi quas culpa quae nulla? Voluptatum, earum. Consequatur et maxime unde ut vitae ipsam numquam quis earum illum eius.Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero perferendis ducimus corporis, doloremque eaque necessitatibus. Iste, provident temporibus nesciunt quis fugit illo consequuntur omnis? Aspernatur eaque veritatis placeat voluptatem vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ut aliquid excepturi beatae assumenda ipsa atque quisquam, sequi doloribus possimus nobis sapiente, dolor accusantium sint maxime animi nisi exercitationem laborum?</Text>
        </>
    );
};